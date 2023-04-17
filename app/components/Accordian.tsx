import React, {useState, useRef} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ListItem } from './ListItem';
import { useBreakpointValue } from "native-base"


 const Accordian = (props) => {


    const [expanded, setExpanded] = useState(false);
    const accordian = useRef()



        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    const  toggleExpand=()=>{
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded)
        }

        
        const accordian_font_size = useBreakpointValue({
            base: 13,
            sm: 14,
            md: 15,
            lg: 16,
            xl: 16
          })

    return (
       <View style={{ }}>
            <TouchableOpacity ref={accordian} style={[styles.row, {backgroundColor: 'rgba(255, 255, 255, 0.4)'}]} onPress={()=>toggleExpand()} >
                <Text style={[styles.title, {fontFamily: 'Poppins_700Bold', fontSize: accordian_font_size, lineHeight: 21, color: '#272626'}]}>{props.title}</Text>
                <View style={{justifyContent: 'flex-end'}}>
                    <Text>{expanded ? '▲' : '▼'}</Text>
                </View>
                {/* <Icon name={expanded ? '→' : '↓'} size={30} /> */}
            </TouchableOpacity>
            <View style={[styles.parentHr]}/>
            {
                expanded &&
                <View style={[styles.child, {backgroundColor: 'rgba(255, 255, 255, 0.4)'}]}>
                    <Text style={{fontFamily: 'Poppins_400Regular', fontSize: accordian_font_size, lineHeight: 21, color: '#545454'}}>{props.data}</Text>
                    {props.isbullets?.map((bullet, index)=>(
                        <ListItem>{bullet}</ListItem>
                    ))}
                   
                </View>
            }
            
       </View>
    )

  }





const styles = StyleSheet.create({
    title:{
        fontSize: 14,
        fontWeight:'bold',
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        marginBottom: 10,
        alignItems:'center',
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.12)",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.9,
        shadowRadius: 3
    },
    parentHr:{
        height:1,
        width:'100%'
    },
    child:{
        padding:16,
        marginBottom: 10,
    }
    
});

export default Accordian;