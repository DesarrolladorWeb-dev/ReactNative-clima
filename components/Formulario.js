import React,{useState} from 'react'
// TouchableWithoutFeedback para las animaciones en boton
// TouchableWithoutFeedback -> a diferencia del HightLigth no tiene funciones de onPressIn onPressOut
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native'
import {Picker} from '@react-native-picker/picker';

const Formulario = ({busqueda, guardarBusqueda,guardarConsultar }) => {

    const {pais, ciudad} = busqueda;

    // Porque no se modifica  con una funcion , sino se modifica con la Api de Animated
    // solo le vamos a ser referencia al valor de la animacion con esta variable : animacionboton 
    const [animacionboton] = useState(new Animated.Value(1)); //el 1 significa el tamaño la escala

    const consultarClima = () => {
        if(pais.trim() === '' || ciudad.trim() === ''){
            mostrarAlerta();
            return;
        }
        // Consultar la APi
        guardarConsultar(true)
    }
    const mostrarAlerta = () => {
        Alert.alert(
            'Error', 
            'Agregar una ciudad y pais para la busqueda',
            [{text: 'Entendido'}]
        )
    }


    // Aqui solo creamos la animacion
    const animacionEntrada = () => {
        // Hay varios metodos que se le puede pasar 
        //spring : movimiento mas realista a la animacion 
        Animated.spring(animacionboton, {
            // va a ir del valor 1 como esta arriba a 9
            toValue: .75,  //se hara pequeño
        }).start();
    }

    const animacionSalida = () => {
        Animated.spring(animacionboton, {
            toValue: 1, //hacia donde va a finalizar la animacion 
            friction: 4, // controlar el rebote
            tension: 30 //mientras menor sea el numero mas suabe es el movimiento
        }).start();
    }
    // Vamos a tener una transformacion que va a ser de tipo scale , es lo mismo 
    // que crear abajo un styles , esto es un CSS
    const estiloAnimacion = {
        transform: [{scale:animacionboton }]
    }

    return ( 
        <>
            <View style={StyleSheet.Formulario}>
                <View>
                    <TextInput 
                    // como es un objeto se pasamos una copia y solo modifico ciudad
                    onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
                    value={ciudad}
                    style={styles.input}
                        placeholder='Ciudad'
                        placeholderTextColor='#666' // para que el color se resalte

                    />
                </View>
                <View
                    style={{ height: 120, backgroundColor: '#FFF'}}
                >
                    <Picker
                    // como es un objeto se pasamos una copia y solo modifico pais
                    onValueChange={pais => guardarBusqueda({...busqueda, pais})}
                    selectedValue={pais}
                    itemStyle={{ height: 120, backgroundColor: '#FFF'}}
                    >
                        <Picker.Item label="--Seleccione un pais--" value="" />
                        <Picker.Item label="Estados Unidos" value="US" />
                        <Picker.Item label="Mexico" value="MX" />
                        <Picker.Item label="Argentina" value="AR" />
                        <Picker.Item label="Colombia" value="CO" />
                        <Picker.Item label="Costa Rica" value="CR" />
                        <Picker.Item label="España" value="ES" />
                        <Picker.Item label="Peru" value="PE" />
                    </Picker>
                </View>
                {/* TouchableWithoutFeedback tiene dos metodos extra que solo este lo tiene  */}
                <TouchableWithoutFeedback
                // Cuando Presionas  con el dedo 
                    onPressIn={() => animacionEntrada() }
                // Cuando lo Sueltas
                    onPressOut={() => animacionSalida() }
                    onPress={() => consultarClima()}
                >
                    {/* Usamos Animated de esta manera */}
                    <Animated.View
                    // Con las llaves usamos los dos estilos CSS
                    style={[styles.btnBuscar , estiloAnimacion]}>
                        <Text style={styles.textoBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
     );
}
const styles = StyleSheet.create({
    input:{
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'

    },
    btnBuscar:{
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    textoBuscar:{
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18

    }
})

export default Formulario;