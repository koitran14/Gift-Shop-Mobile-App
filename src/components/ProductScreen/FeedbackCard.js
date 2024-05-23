import { View, Text, Image } from "react-native";
import { ProductService } from "../../services";
import { Images } from "../../contants";

export default function FeedbackCard({feedback}) {
    return (
        <View style={{
            display: 'flex',
            flexDirection:'row',
            gap: 20,
            backgroundColor: '#f8f8f8',
            borderRadius: 10,
            padding: 15,
            alignItems: 'flex-start',
        }}>
            <Image source={Images.SUB} style={{height: 50, width: 50, borderRadius: 9999}}/>
            {/* <View style={{ height: 50, width: 50, backgroundColor: 'lightgrey', borderRadius: 9999}}></View> */}
            <View>
                <Text style={{ fontSize: 14, fontWeight: '600'}}>{feedback?.user.username}</Text>
                <View style={{ marginTop: 1,display: 'flex', flexDirection: 'row', gap: 4, alignItems:'center'}}>
                    {ProductService.renderStars(feedback?.rating)}
                </View>
                <View style={{
                    marginTop: 5,
                }}>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '400',
                    }}>
                        {feedback?.comment}
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '400',
                        marginTop: 7,
                        color: 'grey'
                    }}>
                       {new Date(feedback?.feedbackDate).toLocaleString()}
                    </Text>
                </View>
            </View>
        </View>
    )
}