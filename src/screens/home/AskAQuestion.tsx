/* eslint-disable camelcase */
import React, { useLayoutEffect, useState, useContext } from 'react';
import { Container, Content, Thumbnail} from 'native-base';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Alert} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Theme, Style, HeaderStyle } from '../../Theme.style';
import { MainStackParamList } from '../../navigation/AppNavigator';
import {askQuestion} from "../../graphql/queries";
import WhiteButton from '../../components/buttons/WhiteButton';
import { API, graphqlOperation } from 'aws-amplify';
import UserContext, { TMHCognitoUser, UserData } from '../../contexts/UserContext';
const style = StyleSheet.create({
    content: {
        ...Style.cardContainer,
        backgroundColor: Theme.colors.black
    },
    body: { 
      ...Style.body, 
      marginTop: 32 ,
      marginHorizontal:16
    },
    headingText:{
        color:Theme.colors.gray5,
        fontSize:16,
        fontWeight:"400",
        lineHeight:24
    },
    minorText:{
        marginTop:8,
        fontSize:12,
        lineHeight:18,
        color:Theme.colors.gray5
    },
    header: Style.header,
    headerTitle: {
      ...HeaderStyle.title, 
      fontSize:16,
      marginLeft:-40,
    },
    input: {
        backgroundColor: Theme.colors.gray1,
        borderColor: Theme.colors.white,
        borderWidth: 3,
        height: 104,
        marginTop:24,
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 20,
      },
});

interface Params {
    navigation: StackNavigationProp<MainStackParamList, 'AskAQuestion'>;
}

export default function AskAQuestion({navigation}: Params): JSX.Element {
  const userContext = useContext(UserContext);
  const {userData} = userContext;
  console.log(userData?.email)
    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: true,
          title: 'Send In A Question',
          headerTitleStyle: style.headerTitle,
          headerStyle: { backgroundColor: Theme.colors.black },
          headerLeft: function render() {
            return (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
              >
                <Thumbnail
                  square
                  source={Theme.icons.white.closeCancel}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            );
          },
          headerLeftContainerStyle: { left: 16 },
        });
      }, [navigation]);
    const [question, setQuestion] = useState("");
     const submitQuestion = async () =>{
        if(userData?.email && userData?.email_verified){
          const variables = {email:userData?.email, body:question}
          const data = await API.graphql(graphqlOperation(askQuestion, variables))
          console.log(data)
          navigation.navigate("Main", {screen:"Home", params:{ screen:"HomeScreen", params:{questionResult:"true"}}});
        }
        else{
          Alert.alert('You must be logged in to send a question.')
          navigation.navigate("Main")
        }
      } 
  return (
    <Container>
      <Content style={style.content}>
          <View style={style.body}>
          <Text style={style.headingText}>{"Questions submitted here will have the chance to be answered this week after the sermon during our Q&A time."}</Text>
          <TextInput
            accessibilityLabel="Question Description"
            keyboardAppearance="dark"
            editable
            autoFocus
            placeholder={"Ask whatever you'd like..."}
            placeholderTextColor="#646469"
            textContentType="none"
            keyboardType="default"
            value={question}
            multiline
            onChange={(e) => setQuestion(e.nativeEvent.text)}
            maxLength={1500}
            autoCapitalize="sentences"
            style={style.input}
          />
          <Text style={style.minorText}>{"We do our best to answer as many questions as possible, but we cannot gaurantee that we’ll be able to get to yours."}</Text>
          <WhiteButton
            style={{ height: 56, marginVertical:40 }}
            label="Submit a Question"
            onPress={submitQuestion}
          />
          </View>
      </Content>
    </Container>
  );
}
