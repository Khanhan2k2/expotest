import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image} from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';
import { useState, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import IconButton from './components/IconButton';
import CircleButton from './components/CircleButton';
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
export default function App() {
const PlaceholderImage = require('./assets/images/318445417_663286095328784_1342925568787049471_n.jpg');
const [status, requestPermission] = MediaLibrary.usePermissions();
const [pickedEmoji, setPickedEmoji] = useState(null);
const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const imageRef = useRef();

  const pickImageAsync = async () => {
    alert("huhuh")
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };
  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  if(!status.status)
    requestPermission();
  const onSaveImageAsync = async () => {
    try {
      
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      alert("error")
      console.log(e);
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={{color:'#fff'}}>Hello Phương Phương!</Text>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
              placeholderImageSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
            {pickedEmoji !== null ? <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> : null}
        </View>
      </View>
      {showAppOptions ? 
      (<View style={styles.optionsContainer}>
        <View style={styles.optionsRow}>
          <IconButton label="Reset" icon="refresh" onPresss={onReset} />
          <CircleButton onPress={onAddSticker} />
          <IconButton icon="save-alt" label="Save" onPresss={onSaveImageAsync} />
        </View>
      </View> ) :
      (<View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
        <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
      </View>)}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
      <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style='auto' />
    </GestureHandlerRootView>
  );
}
console.warn("Bé Phương đang giận !!!!");
console.error("Sắp xếp lịch như qq");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
