import { Thumbnail } from 'native-base';
import React, { useState, memo } from 'react';
import { View, StyleSheet, Text, Image, Platform } from 'react-native';
import { Theme, Style } from '../../Theme.style';
import { TouchableOpacity } from "react-native-gesture-handler"
import * as Linking from 'expo-linking';
import CachedImage from "react-native-expo-cached-image";
import ActivityIndicator from '../../components/ActivityIndicator';
const style = StyleSheet.create({
    container: {
        marginTop: 6,
        padding: 15,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomLeftRadius: 25,
        borderColor: "gray",
    },
    pictureContainer: {
        marginTop: 0,
        marginHorizontal: 16,
        borderRadius: 100,
        width: 48,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    picture: {
        borderRadius: 100,
        justifyContent: 'center',
        width: 48,
        height: 48
    },
    pictureIndicator: {
        position: "absolute",
        zIndex: 3000,
        borderRadius: 100,
        justifyContent: 'center',
        width: 48,
        height: 48
    },
    fallbackPictureContainer: {
        backgroundColor: "#54565A",
        borderRadius: 100,
        width: 48,
        height: 48,

    },
    fallBackPicture: {
        height: 23,
        width: 23
    },
    Name: {
        color: "white",
        fontSize: 16,
        lineHeight: 24,
        fontFamily: Theme.fonts.fontFamilyBold
    },
    Position: {
        marginTop: 2,
        maxWidth: "70%",
        minWidth: "70%",
        color: "white",
        fontFamily: Theme.fonts.fontFamilyRegular,
        fontSize: 12,
    },
    footerText: {
        marginTop: 8,
        color: "white",
        textDecorationLine: "underline",
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 18
    },
    icon: { ...Style.icon, width: 23, height: 23, },
    iconContainer: {
        justifyContent: "center",
        padding: 16
    },
})
interface Props {
    navigation: any;
    staff: {
        FirstName: string
        LastName: string
        Email: string
        Position: string
        Phone: string
        sites: Array<string | null>
        Location: string | null
        Coordinator: boolean | null
        Teacher: boolean | null
        uri: string
    }
}

function StaffItem({ navigation, staff }: Props): JSX.Element {
    const [isLoading, setIsLoading] = useState(true);
    const uriError = () => {
        setUri(Theme.icons.white.user)
    }
    const [uri, setUri] = useState(staff.uri)
    return (
        <View style={style.container}>
            <View style={style.pictureContainer}>
                {isLoading ? <ActivityIndicator style={style.pictureIndicator} animating={isLoading}></ActivityIndicator> : null}
                {Platform.OS === "android" ?
                    uri ? <CachedImage onLoadEnd={() => setIsLoading(false)} style={style.picture} onError={() => {
                        setIsLoading(false)
                        uriError()
                    }} source={{ uri }} />
                        : <View style={style.fallbackPictureContainer}><Image style={style.fallBackPicture} source={Theme.icons.white.user}></Image></View> :
                    <Image onLoadEnd={() => setIsLoading(false)} style={style.picture} onError={() => {
                        setIsLoading(false)
                        uriError()
                    }} source={{ uri: uri, cache: "default" }} />
                }
            </View>
            <View style={{ flexDirection: "column" }}>
                {staff.FirstName && staff.LastName ?
                    <Text style={style.Name}>{staff.FirstName} {staff.LastName}</Text>
                    : null}
                {staff.Position ?
                    <Text style={style.Position}>{staff.Position}</Text>
                    : null}
                {staff.Teacher ?
                    <TouchableOpacity onPress={() => {
                        navigation.push('TeacherProfile', {
                            staff: { ...staff, uri: uri, Phone: staff.Phone },
                        })
                    }
                    }>
                        <Text style={style.footerText}>
                            View Teaching
                        </Text>
                    </TouchableOpacity>
                    : null}
            </View>
            <View style={{ flexDirection: "column", flex: 1, }}>
                <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                    {staff.Phone ?
                        <TouchableOpacity onPress={() => Linking.openURL(`tel:${staff.Phone}`)} style={style.iconContainer}>
                            <Thumbnail style={style.icon} source={Theme.icons.white.phone} square></Thumbnail>
                        </TouchableOpacity> : null}
                    {staff.Email ?
                        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${staff.Email}`)} style={style.iconContainer}>
                            <Thumbnail style={style.icon} source={Theme.icons.white.contact} square></Thumbnail>
                        </TouchableOpacity>
                        : null}
                </View>
            </View>
        </View >

    )
}
export default memo(StaffItem);