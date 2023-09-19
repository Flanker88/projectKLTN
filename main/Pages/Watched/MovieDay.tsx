import { Text } from '@rneui/themed';
import React,{useRef} from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Trash from 'main/Components/Trash';
import LineItem from 'main/Model/Realm/LineItem';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const WatchedItem = ({
	LineItems,
	eventRightAction,
	navigation,
}: {
	LineItems: LineItem;
	eventRightAction: Function;
	navigation: any;
}) => {
	const { t, i18n: i18nInstance } = useTranslation();
	dayjs.locale(t('dayjs'));
	const swipeableRef = useRef(null);
	const closeSwipeable = () => {
		swipeableRef.current.close();
	}
	const imgPath = "https://image.tmdb.org/t/p/w500" + LineItems.poster_path
	return (
		<Swipeable
		ref={swipeableRef }
			renderRightActions={() =>
				Trash({ handlePress: eventRightAction, id: LineItems.id,closeSwipeable})
			}
			containerStyle={{
				width: '95%',
				borderRadius: 18
			}}
			childrenContainerStyle={{
			}}
		>
			<TouchableOpacity style={stylesMovieItem.container} onPress={() => {
				navigation.navigate("DetailLineItem", {
					movieID: LineItems.id,
					media_type: LineItems.media_type,
				});
			}}>
				<View >
					<Image source={{ uri: imgPath }} style={stylesMovieItem.Image} />
				</View>
				<View style={stylesMovieItem.Info}>
					<Text style={{
						color: "#9DA0A8",
						fontSize: 13,
						fontFamily: "Open Sans"
					}}>
						{LineItems.media_type === "movie" ? t('movie') : t('TV')}
					</Text>
					<Text
						numberOfLines={2}
						ellipsizeMode="tail"
						style={{
							color: "#FFF",
							fontSize: 15,
							fontFamily: "Open Sans",
							width: "80%"
						}}>
						{LineItems.name}
					</Text>
					<Text style={{
						color: "#9DA0A8",
						fontSize: 13,
						fontFamily: "Open Sans"
					}}>
						{dayjs(LineItems.release_date).format('DD MMMM, YYYY')}
					</Text>
				</View>
			</TouchableOpacity>
		</Swipeable>
	);
};

const stylesMovieItem = StyleSheet.create({
	container: {
		width: "95%",
		marginLeft: 20,
		height: 105,
		backgroundColor: "#10121B",
		borderRadius: 18,
		flexDirection: 'row',
		marginTop: 10,
	},
	Info: {
		justifyContent: "center",
		marginLeft: 10,
		width: "90%"
	},
	Image: {
		height: 105,
		width: 70,
		borderRadius: 18,
	}
})
export default WatchedItem;
