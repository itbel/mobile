import React, { useEffect } from 'react';
import { AppLoading } from 'expo';
import { Auth } from '@aws-amplify/auth'
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../../navigation/AppNavigator';

export default function CheckUser(props: { navigation: StackNavigationProp<MainStackParamList, 'CheckUser'> }): JSX.Element {
    useEffect(() => {
        async function checkForUser() {
            try {
                const user = await Auth.currentAuthenticatedUser()
                if (user.attributes.email_verified)
                    props.navigation.navigate('Main', { screen: 'Home', params: { screen: 'HomeScreen' } })
                else
                    props.navigation.navigate('Auth')
            } catch (e) {
                console.debug(e)
                props.navigation.navigate('Auth')
            }
        }
        checkForUser();
    }, [])

    return <AppLoading />
}

