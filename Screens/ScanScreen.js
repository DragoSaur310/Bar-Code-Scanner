import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity, TextInput, Image, Alert, ToastAndroid, KeyboardAvoidingView} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'
import { render } from 'react-dom'

export default class ScanScreen extends React.Component{
    constructor(){ 
        super();
        this.state = {
            hasCamPerms: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

    getCamPerms = async(ID) => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({ hasCamPerms: status === "granted",
                        buttonState: 'clicked',
                        scanned: false
        })
    }

    handleBarCodeScanned = async({type, data}) => {
        this.setState({scanned: true,
            scannedBook: data,
            buttonState: 'normal'
        })
    } 

    render(){
        if(this.state.buttonState === "clicked" && this.state.hasCamPerms){
            return(
                <BarCodeScanner onBarCodeScanned = {this.state.scanned ? undefined : this.handleBarCodeScanned}
                                style = {StyleSheet.absoluteFillObject} 
                />
            )
        }
        else if(this.state.buttonState === "normal"){
            return(
                <View>
                    <Image  source = {require("../assets/BarCodeScanner.jpg")}
                            style = {{width: 250, height: 300}}
                    />
                    <Text style = {{color: "red", fontWeight: 'bold'}}> Bar Code Scanner </Text>
                    <Text>{this.state.hasCamPerms = true? this.state.scannedData:"Request Camera Permissions"}</Text>

                    <TouchableOpacity   style = {{margin: 15, backgroundColor: "aqua", borderRadius: 30, borderColor: "green", borderWidth: 3, width: 130}}
                                        onPress = {this.getCamPerms}
                    >
                        <Text> Scan Bar Code </Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}