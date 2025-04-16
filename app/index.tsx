import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function Index() {
    const [moedaOrigem, setMoedaOrigem] = useState('USD');
    const [moedaDestino, setMoedaDestino] = useState('BRL');
    const [valor, setValor] = useState('');
    const [resultado, setResultado] = useState('');
    const [modoCripto, setModoCripto] = useState(false); 

    const moedas = [
        { code: 'USD', name: 'Dólar Americano' },
        { code: 'BRL', name: 'Real Brasileiro' },
        { code: 'EUR', name: 'Euro' },
        { code: 'JPY', name: 'Iene Japonês' },
        { code: 'GBP', name: 'Libra Esterlina' },
        { code: 'AUD', name: 'Dólar Australiano' },
        { code: 'CAD', name: 'Dólar Canadense' },
        { code: 'CHF', name: 'Franco Suíço' },
        { code: 'CNY', name: 'Yuan Chinês' },
        { code: 'SEK', name: 'Coroa Sueca' },
        { code: 'INR', name: 'Rupia Indiana' },
        { code: 'RUB', name: 'Rublo Russo' },
        { code: 'MXN', name: 'Peso Mexicano' },
        { code: 'ZAR', name: 'Rand Sul-Africano' },
        { code: 'KRW', name: 'Won Sul-Coreano' },
        { code: 'SGD', name: 'Dólar de Singapura' },
        { code: 'NZD', name: 'Dólar Neozelandês' },
        { code: 'HKD', name: 'Dólar de Hong Kong' },
        { code: 'NOK', name: 'Coroa Norueguesa' },
        { code: 'TRY', name: 'Lira Turca' },
        { code: 'ARS', name: 'Peso Argentino' },
        { code: 'CLP', name: 'Peso Chileno' },
        { code: 'AED', name: 'Dirham dos Emirados Árabes' },
        { code: 'SAR', name: 'Rial Saudita' },
        { code: 'THB', name: 'Baht Tailandês' },
        { code: 'PLN', name: 'Zloty Polonês' },
        { code: 'DKK', name: 'Coroa Dinamarquesa' },
        { code: 'MYR', name: 'Ringgit Malaio' },
        { code: 'IDR', name: 'Rupia Indonésia' }
    ];

    const criptomoedas = [
        { code: 'BTC', name: 'Bitcoin (BTC)' },
        { code: 'ETH', name: 'Ethereum (ETH)' },
        { code: 'LTC', name: 'Litecoin (LTC)' },
    ];

    const converterMoeda = async () => {
        try {
            const resposta = await axios.get(
                `https://api.exchangerate-api.com/v4/latest/${moedaOrigem}`
            );
            const taxa = resposta.data.rates[moedaDestino];
            const valorConvertido = (parseFloat(valor) * taxa).toFixed(2);
            setResultado(`${valor} ${moedaOrigem} = ${valorConvertido} ${moedaDestino}`);
        } catch (erro) {
            setResultado('Erro ao buscar a taxa de câmbio.');
        }
    };

    const converterCripto = async () => {
        try {
            const resposta = await axios.get(
                `https://api.coingecko.com/api/v3/simple/price?ids=${moedaOrigem.toLowerCase()}&vs_currencies=${moedaDestino.toLowerCase()}`
            );
            const taxa = resposta.data[moedaOrigem.toLowerCase()][moedaDestino.toLowerCase()];
            const valorConvertido = (parseFloat(valor) * taxa).toFixed(2);
            setResultado(`${valor} ${moedaOrigem} = ${valorConvertido} ${moedaDestino}`);
        } catch (erro) {
            setResultado('Erro ao buscar a taxa de câmbio.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Conversor de Moedas e Criptomoedas</Text>

        
            <Image
                source={{ uri: 'https://w7.pngwing.com/pngs/815/738/png-transparent-purse-dollar-washington-money.png' }} 
                style={styles.moneyImage}
            />

            <View style={styles.buttonContainer}>
                <Button
                    title="Converter Moeda Tradicional"
                    onPress={() => setModoCripto(false)}
                    color={modoCripto ? '#ddd' : '#4CAF50'}
                />
                <Button
                    title="Converter Criptomoeda"
                    onPress={() => setModoCripto(true)}
                    color={modoCripto ? '#4CAF50' : '#ddd'}
                />
            </View>

            <Text style={styles.label}>Moeda de Origem:</Text>
            <Picker
                selectedValue={moedaOrigem}
                onValueChange={(itemValue) => setMoedaOrigem(itemValue)}
                style={styles.picker}
            >
                {(modoCripto ? criptomoedas : moedas).map((moeda) => (
                    <Picker.Item key={moeda.code} label={`${moeda.name} (${moeda.code})`} value={moeda.code} />
                ))}
            </Picker>

            <Text style={styles.label}>Moeda de Destino:</Text>
            <Picker
                selectedValue={moedaDestino}
                onValueChange={(itemValue) => setMoedaDestino(itemValue)}
                style={styles.picker}
            >
                {(modoCripto ? criptomoedas : moedas).map((moeda) => (
                    <Picker.Item key={moeda.code} label={`${moeda.name} (${moeda.code})`} value={moeda.code} />
                ))}
            </Picker>

            <Text style={styles.label}>Valor:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o valor"
                keyboardType="numeric"
                value={valor}
                onChangeText={setValor}
            />

            <Button
                title="Converter"
                onPress={modoCripto ? converterCripto : converterMoeda}
                color="#4CAF50"
            />

            {resultado ? <Text style={styles.result}>{resultado}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000', 
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff',
    },
    label: {
        fontSize: 16,
        color: '#fff', 
        marginBottom: 5,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
        color: '#fff', 
        backgroundColor: '#333', 
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff', 
        borderRadius: 5,
        color: '#000', 
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff', 
    },
    moneyImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
        alignSelf: 'center', 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
});
