import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function Index() {
    const [moedaOrigem, setMoedaOrigem] = useState('USD');
    const [moedaDestino, setMoedaDestino] = useState('BRL');
    const [valor, setValor] = useState('');
    const [resultado, setResultado] = useState('');

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Conversor de Moedas</Text>

            <Text>Moeda de Origem:</Text>
            <Picker
                selectedValue={moedaOrigem}
                onValueChange={(itemValue) => setMoedaOrigem(itemValue)}
                style={styles.picker}
            >
                {moedas.map((moeda) => (
                    <Picker.Item key={moeda.code} label={`${moeda.name} (${moeda.code})`} value={moeda.code} />
                ))}
            </Picker>

            <Text>Moeda de Destino:</Text>
            <Picker
                selectedValue={moedaDestino}
                onValueChange={(itemValue) => setMoedaDestino(itemValue)}
                style={styles.picker}
            >
                {moedas.map((moeda) => (
                    <Picker.Item key={moeda.code} label={`${moeda.name} (${moeda.code})`} value={moeda.code} />
                ))}
            </Picker>

            <Text>Valor:</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o valor"
                keyboardType="numeric"
                value={valor}
                onChangeText={setValor}
            />

            <Button title="Converter" onPress={converterMoeda} />

            {resultado ? <Text style={styles.result}>{resultado}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    result: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
