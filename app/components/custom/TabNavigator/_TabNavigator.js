import React from 'react';
import {
    View,
    TouchableWithoutFeedback,
    Platform,
    Text,
    Animated
} from 'react-native';
import {
    createNavigator,
    createNavigationContainer,
    TabRouter,
    addNavigationHelpers
} from 'react-navigation';
import {
    WINDOW,
    iPhoneX,
    footerHeight
} from '../../../lib/globals';
import { connect } from 'react-redux';

import styles from './style'

class TabView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tabAnim: new Animated.Value(1),
            footerHeight: footerHeight,
            tabItems: [
                {
                    animationValue: new Animated.Value(0),
                },
                {
                    animationValue: new Animated.Value(1),
                },
                {
                    animationValue: new Animated.Value(1),
                },
                {
                    animationValue: new Animated.Value(1),
                }]
        }
    }


    renderIcon(icon, options, isActive, index) {
        let tintColor = isActive ? options.activeTintColor : options.inactiveTintColor;
        let transformFooterElement = {
            opacity: this.state.tabItems[index].animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.6]
            }),
            transform: [
                {
                    scale: this.state.tabItems[index].animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [iPhoneX ? 1.4 : 1.3, 1],
                    })
                },
                {
                    translateY: this.state.tabItems[index].animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [iPhoneX ? 8 : 4, 0],
                    })
                },
            ]
        };
        return (
            <Animated.View style={transformFooterElement}>
                {icon({ tintColor })}
            </Animated.View>

        );
    };

    renderLabel(text, options, isActive, index) {
        let tintColor = isActive ? options.activeTintColor : options.inactiveTintColor;
        return (
            <Animated.View style={{ opacity: this.state.tabItems[index].animationValue }}>
                <Text style={[
                    styles.tab_text, {
                        color: tintColor,
                        fontSize: options.labelStyle.fontSize
                    }
                ]}>
                    {text}
                </Text>
            </Animated.View>
        )
    };

    renderBottomBorder(index) {
        let borderOpacity = {
            opacity: this.state.tabItems[index].animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
            })
        }
        let borderPosition = iPhoneX ? {
            top: -10
        } : {
                bottom: 0
            }
        return (
            <Animated.View style={[styles.bottomBorder, borderOpacity, borderPosition]}>
            </Animated.View>
        )
    };

    getIndex(value, arr, prop) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1;
    }

    TabBar(navigation, tabBarOptions, routeConfigs) {
        const { routes, index } = navigation.state;
        return (
            <Animated.View style={[styles.tab_container, tabBarOptions.style, { height: this.state.footerHeight }]}>
                {routes.map(route => (
                    <TouchableWithoutFeedback onPress={() => {
                        this.animateTabs(index, this.getIndex(route.routeName, routes, 'routeName'));
                        navigation.navigate(route.routeName);
                    }}
                        style={styles.tab}
                        key={route.routeName}>
                        <View style={styles.tab}>
                            {this.renderIcon(routeConfigs[route.routeName].navigationOptions.tabBarIcon, tabBarOptions, routes[index].routeName === route.routeName, this.getIndex(route.routeName, routes, 'routeName'))}
                            {this.renderLabel(routeConfigs[route.routeName].navigationOptions.tabBarLabel || route.routeName, tabBarOptions, routes[index].routeName === route.routeName, this.getIndex(route.routeName, routes, 'routeName'))}
                            {this.renderBottomBorder(this.getIndex(route.routeName, routes, 'routeName'))}
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </Animated.View>
        );
    };

    animateTabs(prevIndex, newIndex) {
        Animated.parallel([
            Animated.timing(this.state.tabItems[prevIndex].animationValue, {
                toValue: 1,
                duration: 300,
            }),
            Animated.timing(this.state.tabItems[newIndex].animationValue, {
                toValue: 0,
                duration: 300,
            })
        ]).start();
    }

    render() {
        const {
            router,
            navigation,
            tabBarOptions,
            screenProps,
            routeConfigs
        } = this.props;

        const { routes, index } = navigation.state;
        const ActiveScreen = router.getComponentForState(navigation.state);

        return (
            <View style={styles.container}>
                <ActiveScreen navigation={{
                    ...navigation,
                    state: routes[index]
                }} screenProps={screenProps} style={{
                    zIndex: 0
                }} />
                {this.TabBar(navigation, tabBarOptions, routeConfigs)}
            </View>
        );
    }
}

const TabNavigator = (routeConfigs, settings) => {

    const router = TabRouter(routeConfigs, settings);
    const navigator = createNavigator((props: *) => (<ConnectedTabView {...props} router={router} tabBarOptions={settings.tabBarOptions} routeConfigs={routeConfigs} />), router, routeConfigs);

    return createNavigationContainer(navigator);
};

const mapStateToProps = (state) => {
    const { navState } = state;
    return { navState };
}
const ConnectedTabView = connect(mapStateToProps)(TabView);

export default TabNavigator;
