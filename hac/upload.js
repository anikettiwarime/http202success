import React, { useState } from 'react';
// Import core components
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

// Import Document Picker
import DocumentPicker from 'react-native-document-picker';

const test = () => {
    const [singleFile, setSingleFile] = useState(null);

    const uploadImage = async () => {
        if (singleFile != null) {
            const fileToUpload = singleFile;
            const data = new FormData();
            data.append('name', 'Image Upload');
            data.append('file_attachment', fileToUpload);
            // Please change file upload URL
            let res = await fetch('http://127.0.0.1:5000/upload', {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'multipart/form-data; ',
                },
            }
            );
            let responseJson = await res.json();
            if (responseJson.status == 1) {
                alert('Upload Successful');
            }
        } else {
            // If no file selected the show alert
            alert('Please Select File first');
        }
    };

    const selectFile = async () => {
        // Opening Document Picker to select one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],                
            });
            console.log('res : ' + JSON.stringify(res));
            // Setting the state to show single file attributes
            setSingleFile(res);
        } catch (err) {
            setSingleFile(null);
            // Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                // If user canceled the document selection
                alert('Canceled');
            } else {
                // For Unknown Error
                alert('Unknown Error: ' + JSON.stringify(err));
                throw err;
            }
        }
    };
    return (
        <View style={styles.mainBody}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 30, textAlign: 'center' }}>
                    React Native File Upload Example
                </Text>
                <Text
                    style={{
                        fontSize: 25,
                        marginTop: 20,
                        marginBottom: 30,
                        textAlign: 'center',
                    }}>
                </Text>
            </View>
            {/*Showing the data of selected Single file*/}
            {singleFile != null ? (
                <Text style={styles.textStyle}>
                    File Name: {singleFile.name ? singleFile.name : ''}
                    {'\n'}
                    Type: {singleFile.type ? singleFile.type : ''}
                    {'\n'}
                    File Size: {singleFile.size ? singleFile.size : ''}
                    {'\n'}
                    URI: {singleFile.uri ? singleFile.uri : ''}
                    {'\n'}
                </Text>
            ) : null}
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={selectFile}>
                <Text style={styles.buttonTextStyle}>Select File</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={uploadImage}>
                <Text style={styles.buttonTextStyle}>Upload File</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
    },
});

export default test;