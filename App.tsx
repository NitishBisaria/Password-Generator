//Yup(package) is a schema builder for runtime value parsing and validation. Define a schema, transform a value to match, assert the shape of an existing value, or both.

//Formik(form library) is the world's most popular open source form library for react and react native.for installing this library, write command-npm install formik --save

//react-native-bouncy-checkbox library--> It simply gives you checkboxes.for installing this library ,write command- npm i react-native-bouncy-checkbox.
import { ScrollView, StyleSheet, Text, View,SafeAreaView,TextInput,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BouncyCheckbox from "react-native-bouncy-checkbox";

//Form validation
import * as Yup from 'yup'
import { Formik } from 'formik';

const PasswordSchema=Yup.object().shape({      //here we are validating password schema and then using yup package and in that yup package there is many objects so we have to write Yup.objects() and then we are defining the shape () it means what we have to validate like number strings etc etc ,in that shape we create object and write the property which we want to validate like passwordLength and then use yup package and tell them what you want to validate in password length like Yup.number().
  passwordLength:Yup.number()
  .min(4,'Should be min of 4 characters')
  .max(16,'Should be a max of 16 characters')
  .required('Length is required')
})
export default function App() {

const [password,setPassword]=useState('')   //useState is React Hook that allows you to add state to a functional component. It returns an array with two values: the current state and a function to update it.
const [isPassGenerated,setIsPassGenerated]=useState(false)

const[lowerCase,setLowerCase]=useState(true)
const[upperCase,setUpperCase]=useState(false)
const[numbers,setNumbers]=useState(false)
const[symbols,setSymbols]=useState(false)

const generatePasswordString=(passwordLength: number) => {
  let characterList='';

  const upperCaseChars='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCaseChars='abcdefghijklmnopqrstuvwxyz';
  const digitalChars='0123456789';
  const specialChars='!@#$%^&*()_+';

  if(upperCase){
    characterList += upperCaseChars
  }
  if(lowerCase){
    characterList += lowerCaseChars
  }
  if(digitalChars){
    characterList += digitalChars
  }
  if(specialChars){
    characterList += specialChars
  }

  const passwordResult=createPassword(characterList,passwordLength)

  setPassword(passwordResult)
  setIsPassGenerated(true)
}

const createPassword=(characters: string,passwordLength:number) =>{
  let result=''
  for (let i = 0; i < passwordLength; i++) {
    const characterIndex=Math.round(Math.random() *characters.length)
    result +=characters.charAt(characterIndex)
  }
  return result
}

const resetPasswordState=()=>{
  setPassword('')
  setIsPassGenerated(false)
  setLowerCase(true)
  setUpperCase(false)
  setNumbers(false)
  setSymbols(false)
}

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
        <Text style={styles.title}>Password Generator</Text>
        <Formik
       initialValues={{passwordLength:''}}      //initial value means like what what value we are tracking.
       validationSchema={PasswordSchema}       //we have our validation scehema in password schema above.so we simply give reference like password schema.
      onSubmit={ values=> {
        console.log(values);
        generatePasswordString(+values.passwordLength)  //this + will convert this password length into number from string.
      }}  //here basically i want values which are coming from the form and i will pass those values in some method.And all the values coming to me is inside the 'values'.
     >
       {({
         values,
         errors,
         touched,  //In Formik, the “touched” property is used to determine if a field has been visited or touched by the user12. It contains boolean values for each field, indicating whether the user has interacted with that field or not. This property is often used for displaying errors.
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
        <>
        <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength &&(
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
          </View>
          <TextInput
            style={styles.inputStyle}
            value={values.passwordLength}  //all of the inputs that you write inside the formik,you have to pass on all the values into this values,so values is a big object where you pass on.and with this you give the property like password length.
            onChangeText={handleChange('passwordLength')}   //handleChange is a change handler in Formik that is used to update form values based on the name property of the input that has been updated.
            placeholder="Ex. 8"
            keyboardType='numeric'
            />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lowercase</Text>
        <View style={styles.inputColumn}>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={lowerCase}   //this will track the state we defined like is lowercase is true then it will match with its state we have.
          onPress={()=>setLowerCase(!lowerCase)}   //we want to toggle the state itself.
          fillColor="#29AB87"
          />
          </View>
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include uppercase letters</Text>
        <View style={styles.inputColumn}>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={upperCase}   //this will track the state we defined like is lowercase is true then it will match with its state we have.
          onPress={()=>setUpperCase(!upperCase)}   //we want to toggle the state itself.
          fillColor="#FED85D"
          />
           </View>
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include Numbers</Text>
        <View style={styles.inputColumn}>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={numbers}   //this will track the state we defined like is lowercase is true then it will match with its state we have.
          onPress={()=>setNumbers(!numbers)}   //we want to toggle the state itself.
          fillColor="#C9A0DC"
          />
           </View>
        </View>

        <View style={styles.inputWrapper}>
        <Text style={styles.heading}>Include Symbols</Text>
        <View style={styles.inputColumn}>
          <BouncyCheckbox 
          disableBuiltInState
          isChecked={symbols}   //this will track the state we defined like is lowercase is true then it will match with its state we have.
          onPress={()=>setSymbols(!symbols)}   //we want to toggle the state itself.
          fillColor="#FC80A5"
          />
          </View>
        </View>


        <View style={styles.formActions}>  
        <TouchableOpacity disabled={!isValid} style={styles.primaryBtn} onPress={handleSubmit}>     
          <Text style={styles.primaryBtnTxt}>Generate Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={()=>{
          handleReset();
          resetPasswordState();
        }}>
          <Text style={styles.secondaryBtnTxt}>Reset</Text>
        </TouchableOpacity>
        </View>
        </>
       )}
       </Formik>
        </View>
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
})