import React, { Component, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Text, Image } from 'react-native';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MyOrders = ({ navigation }) => {

	const { token } = useSelector(state => state.auth);
	const [myOrder, stMyOrder] = React.useState([])

	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', () => {
			getDetails();
		});

		return unsubscribe;

	}, [navigation])

	const getDetails = () => {
		Axios.get(`http://10.0.2.2:5000/user/riderOrders`,
			{
				headers: {
					'token': token
				}
			})
			.then((res) => {
				stMyOrder(res.data)
				console.log(res.data)
				console.log('myDetails')
			}).catch((error) => {
				console.log(error)
			});
	}

	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1}}>
				{
					myOrder.length > 0 ?
						(
							<TouchableOpacity style={{ flex: 1, flexDirection: 'column' }} onPress={() => { navigation.navigate('OrderDetails', { otherParam: myOrder }) }}>
								{
									myOrder.map((item) => (
										<View key={item._id} style={styles.product}>
											<View style={{  width: wp('35%'), }}>
												<Image source={{ uri: item.image }} resizeMode='stretch' style={{ flex: 1 }} />
											</View>
											<View style={{ width: wp('35%'), padding: 10, marginLeft: 10 }}>
												<View style={{ flex: 0.3, justifyContent: 'center' }}>
													<Text style={{ fontSize: 19, color: 'black', fontWeight: 'bold', }}>{item.title}</Text>
												</View>
												<View style={{ flex: 0.2 }}>
													<Text style={{ fontSize: 13, color: 'black' }}>{item.category}</Text>
												</View>
												<View style={{ flex: 0.2, justifyContent: 'center' }}>
													<Text style={{ fontSize: 11, color: 'black' }}>{item.status} To You</Text>
												</View>
												<View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
													<View style={{ flex: 0.5, justifyContent: 'center' }}>
														<Text style={{ fontSize: 13, color: 'black', color: 'black', fontWeight: 'bold', }}>Rs.{item.price}</Text>
													</View>
												</View>
											</View>
											{/* <View style={{ flex: 0.2, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
												<TouchableOpacity onPress={() => { handleDeleteAd(item._id) }}>
													<DeleteIcon name="delete" size={20} color="black" />
												</TouchableOpacity>
											</View> */}
										</View>
									))
								}
							</TouchableOpacity>
						) : <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }} >
							<Text style={{ fontSize: 15, color: '#186c9b', fontWeight: 'bold' }}> No Result Found</Text>
						</View>
				}
			</View>
		</View>
	)

}

const styles = StyleSheet.create({
	product: {
		display: "flex",
		flexDirection: "row",
		height: 150,
		backgroundColor: "#fff",
		padding: 10,
	},
})

export default MyOrders;