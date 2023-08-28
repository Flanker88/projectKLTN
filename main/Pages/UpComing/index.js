
import React from 'react';
import { View, TouchableOpacity, Image, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { Text } from '@rneui/themed';
import MovieItem from 'main/Components/MovieItem';
import dayjs from 'dayjs'
import useSWR from 'swr'
import axios from 'axios';
import { mvdbkey } from 'main/Config/env';
const UpComing = (props) => {
  const API_URL = "https://api.themoviedb.org/3/movie/upcoming"
  const fetchMovie = async () => {
    const { data: { results } } = await axios.get(API_URL, {
      params: {
        api_key: mvdbkey,
      }
    })
    return results
  }
  const { data, isLoading } = useSWR(API_URL, fetchMovie)
  const englishMonths = {
    January: "Tháng 1",
    February: "Tháng 2",
    March: "Tháng 3",
    April: "Tháng 4",
    May: "Tháng 5",
    June: "Tháng 6",
    July: "Tháng 7",
    August: "Tháng 8",
    September: "Tháng 9",
    October: "Tháng 10",
    November: "Tháng 11",
    December: "Tháng 12"
  };

  function convertDateToVietnamese(dateString) {
    const parts = dateString.split(" ");
    let monthPart = parts[0];
    
    if (monthPart.endsWith(",")) {
      monthPart = monthPart.slice(0, -1);
    }
    
    const year = parts[1];
  
    const vietnameseMonth = englishMonths[monthPart];
    
    if (vietnameseMonth) {
      return `${vietnameseMonth}, ${year}`;
    } else {
      return "Error";
    }
  }

  if (isLoading) return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#090B14"
    }}>
      <View style={stylesHeader.top}>
        <View>
          <Text style={stylesHeader.title}>Đang tải ...</Text>
        </View>
        <TouchableOpacity
          style={stylesHeader.revert}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Image source={require('../../Assets/Revert.png')} />
        </TouchableOpacity>
      </View>
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <View style={[stylesLoading.container, stylesLoading.horizontal]}>
          <ActivityIndicator size="large" color="#F7BE13" />
        </View>
      </View>
    </SafeAreaView >)
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#090B14"
    }}>
      <View style={stylesHeader.top}>
        <TouchableOpacity
          style={stylesHeader.revert}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Image source={require('../../Assets/Revert.png')} />
        </TouchableOpacity>

        <View>
          <Text style={stylesHeader.title}>Danh sách phim</Text>
        </View>
      </View>
      <View style={{
        flex: 1
      }}>
        <ScrollView>
          {data.map((item) => {
            const englishDate = dayjs(item.release_date).format('MMMM, YYYY').toString();
            const vietnameseDate = convertDateToVietnamese(englishDate);
            //console.log(vietnameseDate)
            return (
              <MovieItem
                key={item.id}
                id={item.id}
                url={
                  item.poster_path
                }
                title={item.title}
                release_date={dayjs(item.release_date).format('MMMM DD, YYYY')}
              />
            )
          })}
        </ScrollView>
      </View>
    </SafeAreaView >
  )
}

const stylesHeader = StyleSheet.create({
  top: {
    width: "100%",
    height: 55,
    alignItems: 'center'
  },
  revert: {
    position: "absolute",
    top: 5,
    left: 20,
    padding: 15
  },
  title: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Open Sans",
    fontWeight: 700,
    marginTop: 17
  },
})
const stylesLoading = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default UpComing