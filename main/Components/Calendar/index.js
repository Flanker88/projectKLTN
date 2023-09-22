import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from '@rneui/base';
import { useTranslation } from 'react-i18next';

const CalendarComp = props => {
  const { t } = useTranslation();
  const monthNames = [
    t('t1'),
    t('t2'),
    t('t3'),
    t('t4'),
    t('t5'),
    t('t6'),
    t('t7'),
    t('t8'),
    t('t9'),
    t('t10'),
    t('t11'),
    t('t12'),
  ];

  LocaleConfig.locales['fr'] = {
    monthNames: monthNames,
    monthNamesShort: [
      'Jan.',
      'Feb.',
      'Mar',
      'Apr',
      'May',
      'June',
      'July.',
      'Aug',
      'Sept.',
      'Oct.',
      'Nov.',
      'Dec.',
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'ThursDay',
      'Friday',
      'Saturday',
    ],
    dayNamesShort: [t('sun'), t('mon'), t('tue'), t('wed'), t('thu'), t('fri'), t('sat')],
  };
  LocaleConfig.defaultLocale = 'fr';
  return (
    <View>
      <Calendar
        markingType={'custom'}
        headerStyle={{
          borderRadius: 10,
          backgroundColor: '#202538',
        }}
        onDayPress={day => {
          props.setSelected(day.dateString);
        }}
        markedDates={{
          [props.selected]: {
            customStyles: {
              container: {
                backgroundColor: '#15192D',
                borderColor: '#F7BE13',
                borderWidth: 2,
              },
              text: {
                color: 'white',
              },
            },
          },
        }}
        theme={{
          calendarBackground: '#15192D',
          arrowColor: '#F7BE13',
          dayTextColor: '#FFFFFF',
          textDisabledColor: '#878D95',
          monthTextColor: '#888',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          arrowWidth: 13.5,
          arrowHeight: 7.5,
          todayTextColor: '#F7BE13',
        }}
        style={{
          width: '100%',
          height: 330,
        }}
      />
    </View>
  );
};
export default CalendarComp;
