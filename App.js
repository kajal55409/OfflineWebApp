/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
    Platform,
    TouchableOpacity,
    StyleSheet,
    Text,
    PermissionsAndroid,
    View,
} from 'react-native';

var RNFS = require('react-native-fs');

import { zip, unzip, unzipAssets, subscribe } from 'react-native-zip-archive'

let directorypath = "/storage/emulated/0/Android/media/com.offlinewebapp/";

import { WebView } from 'react-native-webview';

const INJECTED_JAVASCRIPT = `(function() {
    const tokenLocalStorage = window.localStorage.getItem('token');
    window.ReactNativeWebView.postMessage(tokenLocalStorage);
  })();`;

const App = () => {
    const [mainhtmlData, setmainhtmlData] = useState('')


    useEffect(() => {
        createDirecotry()
    }, [])


    // create directory

    const createDirecotry = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                title: "Permission",
                message: "This app needs to internal storage "
            }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                RNFS.readDir(directorypath + 'OfflineData/')
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((err) => {
                        if (err.code == 'EUNSPECIFIED') {
                            RNFS.mkdir(directorypath + "OfflineData").catch((error) => { console.log(error) })
                        }
                    });

            } else {
                console.log(
                    "Permission Denied!",
                    "You need to give  permission to see contacts"
                );
            }
        } catch (err) {
            console.log(err);
        }
    }

    const requestPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                title: "Permission",
                message: "This app needs to internal storage "
            }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                RNFS.readDir(directorypath + 'OfflineData/demo1/')
                    .then((result) => {
                        try {
                            if (result != "" || result != null) {
                                let documentPath = `${'file://' + result[3].path}`;

                                setmainhtmlData(documentPath)
                            }
                        }
                        catch (error) {
                            console.log(error + "..home ios MusicWorxSongs")
                        }
                    })
                    .catch((err) => {
                        if (err.code == 'EUNSPECIFIED') {
                            RNFS.mkdir(directorypath + "OfflineData").catch((error) => { console.log(error) })
                        }
                    });

            } else {
                console.log(
                    "Permission Denied!",
                    "You need to give  permission to see contacts"
                );
            }
        } catch (err) {
            console.log(err);
        }
    }


    const UnzipLocalfun = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                title: "Permission",
                message: "This app needs to internal storage "
            }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                RNFS.readDir(directorypath + 'OfflineData/')
                    .then((result) => {
                        try {
                            if (result != "" || result != null) {
                                for (let i = 0; i < result.length; i++) {
                                    if (result[i].name == 'demo1.zip') {
                                        let documentPath = `${'file://' + result[i].path}`;

                                        // unzip the file 
                                        unzip(documentPath, directorypath + 'OfflineData/', 'UTF-8')
                                            .then((path) => {
                                                requestPermission()
                                                console.log(`unzip completed at ${path}`)
                                            })
                                            .catch((error) => {
                                                console.error(error)
                                            })
                                    }
                                }
                            }
                        }
                        catch (error) {
                            console.log(error + "..home ios MusicWorxSongs")
                        }
                    })
                    .catch((err) => {
                        if (err.code == 'EUNSPECIFIED') {
                            RNFS.mkdir(directorypath + "OfflineData").catch((error) => { console.log(error) })
                        }
                    });

            } else {
                console.log(
                    "Permission Denied!",
                    "You need to give  permission to see contacts"
                );
            }
        } catch (err) {
            console.log(err);
        }
    }




    return (
        <View style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'blue',
            paddingTop: Platform.OS == 'ios' ? 35 : 0,

            // paddingBottom:100,
        }}>

            {mainhtmlData == '' ? <TouchableOpacity
                onPress={() => UnzipLocalfun()}
                style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 10,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }} >

                <Text style={{ color: 'white', fontSize: 15 }}>UnZip LocalFile</Text>

            </TouchableOpacity> : null}


            {mainhtmlData != '' ? <WebView
                scalesPageToFit
                originWhitelist={['*']}
                source={{ uri: mainhtmlData, baseUrl: 'web/' }}
                // source={{html: mainhtmlData}}
                style={{ marginTop: 20 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowFileAccess={true}
                onShouldStartLoadWithRequest={() => true}
                javaScriptEnabledAndroid={true}
                startInLoadingState={true}
                injectedJavaScript={INJECTED_JAVASCRIPT}

            /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
