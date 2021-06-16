import { Video } from 'expo-av';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

const style = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    color: 'white',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default function SermonLandingScreen(): JSX.Element {
  const { width, height } = Dimensions.get('window');
  const videos = [
    {
      link: 'https://v39-as.tiktokcdn.com/3777081a5abd8d06a0764a8e05f9b2d7/60c98ad0/video/tos/useast2a/tos-useast2a-ve-0068c004/23c79e52d5ee4d1b8181ab998fd9fc78/?a=1339&br=2414&bt=1207&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=6&er=&l=2021061523231001023408207350009F9E&lr=all&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M2ppdmdmdDpvNTMzNzczM0ApOzRkNTU7O2Q7NzY6aTY7Z2dpLmNuXmkuNGJgLS1kMTZzc2JgXzNfYDItLjBgLy1jXi06Yw%3D%3D&vl=&vr=',
    },
    {
      link: 'https://v39-as.tiktokcdn.com/f5092a35e3e21dab26306d88534d8d64/60c98aef/video/tos/useast2a/tos-useast2a-ve-0068c004/ba9ebc5b3ce44f82ac4b41a6bfa25350/?a=1339&br=1538&bt=769&cd=0%7C0%7C0&ch=0&cr=0&cs=0&dr=0&ds=6&er=&l=202106152323430102341061601700A689&lr=all&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M2VmOTo0ZDk0NTMzNzczM0ApMzVlOGRpOzs6Nzw0OWVmZWdzbGNvcWpwYF5gLS1kMTZzczAxNTQ1Yi0yXl4yLy4uNV86Yw%3D%3D&vl=&vr=',
    },
    {
      link: 'https://v39-as.tiktokcdn.com/2e4851248dafa6ba44889d1fb82b963f/60c98b04/video/tos/useast2a/tos-useast2a-ve-0068c001/d2e427ada66948889e8024bcdeb7702e/?a=1339&br=2142&bt=1071&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=6&er=&l=202106152324080101152280801600F4DD&lr=all&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M3ZwczRlO2g2NTMzNzczM0ApPDk5NWY3ZDxmN2U3ZTRmN2dmZG0tal9xNDNgLS1kMTZzc19iNC1iLy4zMTNeXzYwXjM6Yw%3D%3D&vl=&vr=',
    },
    {
      link: 'https://v39-as.tiktokcdn.com/0ceb14ef2bfd5bb074b138807e93a3ad/60c98b4f/video/tos/useast2a/tos-useast2a-pve-0068/c0e71293aaf04dee808852b666609c4e/?a=1339&br=2736&bt=1368&cd=0%7C0%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=6&er=&l=202106152324560101150790811200DEB7&lr=all&mime_type=video_mp4&net=0&pl=0&qs=0&rc=anEzaXhxbjVxNDMzNzczM0ApODw6OjlpNGVpNzg2OTY4N2dyLWwxbTZicWtgLS1kMTZzcy02LzE0MjI2NDQyMWEwNTM6Yw%3D%3D&vl=&vr=',
    },
  ];
  const [active, setActive] = useState(0);
  const handleListScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    setActive(Math.round(yOffset / height));
  };
  return (
    <View style={style.container}>
      <FlatList
        onMomentumScrollEnd={handleListScroll}
        snapToInterval={height}
        decelerationRate={0.88}
        data={videos}
        renderItem={({ item, index }) => (
          <Video
            positionMillis={0}
            style={{
              height,
            }}
            source={{
              uri: item.link,
            }}
            resizeMode="cover"
            isLooping
            shouldPlay={index === active}
          />
        )}
      />
      {/*
         <YoutubePlayer
        forceAndroidAutoplay
        webViewProps={{
          injectedJavaScript: `
                var element = document.getElementsByClassName('container')[0];
                element.style.position = 'unset';
                element.style.paddingBottom = 'unset';
                true;
              `,
        }}
        height={Math.round(Dimensions.get('window').height)}
        width={Math.round(Dimensions.get('window').width)}
        videoId={'K5bqy-WLckI' as string}
        play
        initialPlayerParams={{
          controls: true,
          rel: false,
          loop: true,
          modestbranding: true,

          iv_load_policy: 3,
        }}
      />
      */}
    </View>
  );
}
