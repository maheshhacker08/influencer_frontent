import { HStack, Image, Link } from 'native-base';
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Google from "expo-auth-session/providers/google"
import { ResponseType } from "expo-auth-session"
import * as Facebook from "expo-auth-session/providers/facebook"
import { SocialLogin as SL } from "./SocialLogin"
import { ApiResponse, create } from "apisauce"
import * as WebBrowser from "expo-web-browser"
import { useStores } from '../models';
import Config from '../config';

const api = create({    
    baseURL: Config.baseURL,
    headers: { Accept: "application/json" },
})

type TokenAuthResponse = {
    data:{
        access_token:string;
        refresh_token:string;
        user:{
            pk:string;
            email:string;
            first_name:string;
            last_name:string;
        }
    }
}

export const SocialLogin = () => {
    const {
    authenticationStore: {setAuthToken},} = useStores()
    WebBrowser.maybeCompleteAuthSession()
    // INSTAGRAM LOGIN    
  
    //INSTAGRAM LOGIN ENDS

    // FACEBOOK LOGIN
    const [request, response, promptAsync] = Facebook.useAuthRequest({    
        clientId: "1453956991759492",
        responseType: ResponseType.Token,
    })

    React.useEffect(() => {
        if (response?.type === "success") {
        const { access_token } = response.params
        console.log("FB CODE: ",response)      
        api
            .post("/facebook_login/", {
            access_token: access_token,
            code: "",
            id_token: access_token,
            })
            .then((res:ApiResponse<TokenAuthResponse,any>) => {
            setAuthToken(res.data.access_token)          
            })
            .catch((error) => console.log(error))
        }
    }, [response])
    // FACEBOOK LOGIN ENDS

    // GOOGLE LOGIN
    var [GRequest, GResponse, promptgoogleAsync] = Google.useAuthRequest({
        responseType: "id_token",
        expoClientId: "879701954770-e6neflp726pah65jc7kpoohpvv9bbrce.apps.googleusercontent.com",
        webClientId: "879701954770-e6neflp726pah65jc7kpoohpvv9bbrce.apps.googleusercontent.com",
        // iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
        // androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    })
    
    useEffect(() => {
        if (GResponse?.type === "success") {
        const { id_token } = GResponse.params
        console.log("GResponse", GResponse)
        api
            .post("/google_login/", {
            access_token: id_token,
            code: "",
            id_token: id_token,
            })
            .then((res:ApiResponse<TokenAuthResponse,any>) => {
            setAuthToken(res.data.access_token)          
            })
            .catch((error) => console.log(error))
        }    
    }, [GResponse])
    // GOOGLE LOGIN ENDS 

    return (
        <HStack space={5} justifyContent="center">            
            {/* <Link href="#">        
                <Image
                    alt="Insta Login"
                    width="30"
                    height="30"
                    source={require("../../assets/images/backgrounds/Insta.png")}
                />
            </Link>  */}
            
            <TouchableOpacity
                disabled={!request}
                onPress={() => {
                    promptAsync();}
                }
            >
            <Image
                alt="FB Login"
                width="300"
                height="38"
                borderRadius={5}
                source={require("../../assets/images/facebook_login_button_img_sociofusion.png")}
            />
            </TouchableOpacity>
            
            {/* <TouchableOpacity
                disabled={!GRequest}
                    onPress={() => {
                        promptgoogleAsync()
                    }}
                >
            <Image
                alt="Google Login"
                width="30"
                height="30"
                source={require("../../assets/images/backgrounds/Google.png")}
            />
            </TouchableOpacity>  */}
        </HStack>
    
    )
}
