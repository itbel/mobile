import React from 'react';
import { Container, Header, Content, Text, Left, Button, Body, Right, View, Thumbnail, List, ListItem } from 'native-base';
import Theme, { Style } from '../Theme.style';
import { StatusBar, ViewStyle, TextStyle } from 'react-native';
import * as Linking from 'expo-linking';

const style = {
    content: [Style.cardContainer, {
        backgroundColor: Theme.colors.black,
    }],
    header: [Style.header, {}],
    headerLeft: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 50
    },
    headerBody: {
        flexGrow: 3,
        justifyContent: "center",
    } as ViewStyle,
    headerRight: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 50
    },
    headerTitle: [Style.header.title, {
        width: "100%",
    }] as TextStyle,
    headerButtonText: [Style.header.linkText, {}],
    title: [Style.title, {
        marginTop: 130,
        marginBottom: 16,
    }],
    body: [Style.body, {
        marginBottom: 40,
    }],
    searchIcon: [Style.icon, {}],
    searchInput: {
        color: Theme.colors.white,
        fontFamily: Theme.fonts.fontFamilyRegular,
        fontSize: Theme.fonts.medium,
    },
    listItem: {
        marginLeft: 0,
        borderColor: Theme.colors.gray2,
    },
    listText: {
        fontSize: Theme.fonts.medium,
        color: Theme.colors.white,
        fontFamily: Theme.fonts.fontFamilyBold,
    },
    listSubtext: {
        fontSize: Theme.fonts.smallMedium,
        color: Theme.colors.gray5,
        fontFamily: Theme.fonts.fontFamilyRegular,
    },
    listIcon: [Style.icon, {
        marginRight: 16,
        marginLeft: 16,
    }],
    listArrowIcon: [Style.icon, {
    }],
}

function MoreScreen(): JSX.Element {

    const items = [
        { id: "give", text: "Give", subtext: "Donate to The Meeting House", icon: Theme.icons.white.give, action: () => Linking.openURL('https://www.themeetinghouse.com/give') },
        //{ id: "volunteer", text: "Volunteer", subtext: "Help out your local community", icon: Theme.icons.white.volunteer },
        { id: "connect", text: "Connect", subtext: "Get connected with a staff member", icon: Theme.icons.white.connect, action: () => Linking.openURL('https://www.themeetinghouse.com/connect') },
        //{ id: "staff", text: "Staff Directory", subtext: "Contact a staff member directly", icon: Theme.icons.white.staff },
        { id: "homeChurch", text: "Home Church", subtext: "Find a home church near you", icon: Theme.icons.white.homeChurch, action: () => Linking.openURL('https://www.themeetinghouse.com/find-homechurch') },
    ]

    return (
        <Container>
            <Header style={style.header}>
                <StatusBar backgroundColor={Theme.colors.black} barStyle="default" />
                <Left style={style.headerLeft}>
                </Left>
                <Body style={style.headerBody}>
                    <Text style={style.headerTitle}>More</Text>
                </Body>
                <Right style={style.headerRight}>
                    <Button transparent>
                        <Thumbnail style={Style.icon} source={Theme.icons.white.user} square></Thumbnail>
                    </Button>
                </Right>
            </Header>

            <Content style={style.content}>

                <View>
                    <List>
                        {items.slice(0, 2).map(item => {
                            return <ListItem
                                key={item.id} style={style.listItem}
                                onPress={item.action}>
                                <Left>
                                    <Thumbnail style={style.listIcon} source={item.icon} square></Thumbnail>
                                    <View>
                                        <Text style={style.listText}>{item.text}</Text>
                                        <Text style={style.listSubtext}>{item.subtext}</Text>
                                    </View>
                                </Left>
                                <View>
                                    <Thumbnail style={style.listArrowIcon} source={Theme.icons.white.arrow} square></Thumbnail>
                                </View>
                            </ListItem>
                        })}

                        <View style={{ height: 15, backgroundColor: Theme.colors.background, padding: 0 }} />

                        {items.slice(2).map(item => {
                            return <ListItem
                                key={item.id} style={style.listItem}
                                onPress={item.action}>
                                <Left>
                                    <Thumbnail style={style.listIcon} source={item.icon} square></Thumbnail>
                                    <View>
                                        <Text style={style.listText}>{item.text}</Text>
                                        <Text style={style.listSubtext}>{item.subtext}</Text>
                                    </View>
                                </Left>
                                <View>
                                    <Thumbnail style={style.listArrowIcon} source={Theme.icons.white.arrow} square></Thumbnail>
                                </View>
                            </ListItem>
                        })}
                    </List>
                </View>
            </Content>
        </Container>

    )
}

export default MoreScreen;

