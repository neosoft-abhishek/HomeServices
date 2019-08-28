
//loader that get called on page open
import React from 'react';
import { ActivityIndicator } from 'react-native';

const Loader = (props) => {
        return (
               <ActivityIndicator
                    animating={true}
                    style={{                   
                    marginTop: '60%',
                    zIndex: 10
                }}
                    size="large"/>
        );
}

export default Loader;
