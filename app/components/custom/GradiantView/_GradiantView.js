import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

export const _GradiantView = props => {

    const colorArr = {
        purple: ['#3555ec', '#4b40e1', '#6925cf'],
        green: ['#00d565', '#00c461', '#00a454'],
        gray: ['#f5f5f5', '#f2f2f2', '#ddd'],
        red: ['#f95e5e', '#fb5656', '#FF5050'],
        blue: [ '#85aff0', '#649af6', '#1f52f6']
    }
    

    const gradiant = props.color ? colorArr[props.color] : colorArr['purple']

   return (
    <LinearGradient colors={gradiant} style={[{width: '100%'}, props.style]}>
        {props.children}
    </LinearGradient>
   )
}