import React, {memo} from 'react';
import {View, Text} from 'react-native';

const Test = memo(
    ({title} : {title:string}) =>(
        <View>
            <Text>{title}</Text>
        </View>
    ),
    (prevProps, nextProps) =>{
        return prevProps.title === nextProps.title;
    }
);