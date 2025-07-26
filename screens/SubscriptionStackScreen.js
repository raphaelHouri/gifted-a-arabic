import React from 'react'
import {View,} from 'react-native'
import SubscriptionScreen from './SubscriptionScreen'


const SubscriptionStackScreen = () => {

  return (
    <View className="flex-1">
      <SubscriptionScreen allowBack={true}/>
    </View>

  )
}

export default SubscriptionStackScreen