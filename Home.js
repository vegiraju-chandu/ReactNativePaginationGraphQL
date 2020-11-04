
import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ActivityIndicator
} from 'react-native';

const BASE_URL = 'https://hasura.io/learn'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ2ZWdpcmFqdS5jaGFuZHVAZ21haWwuY29tIiwibmFtZSI6InZlZ2lyYWp1LmNoYW5kdSIsImlhdCI6MTYwNDM4NjU1OC4zMywiaXNzIjoiaHR0cHM6Ly9oYXN1cmEuaW8vbGVhcm4vIiwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6InZlZ2lyYWp1LmNoYW5kdUBnbWFpbC5jb20iLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtcm9sZSI6InVzZXIifSwiZXhwIjoxNjA0NDcyOTU4fQ.NEpoAIb_DW-Fe53rsSQp43ERWkfhHg4xYcTXOK_veQM'

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            usersData: [],
        }
        this.nextPage = 1;
        this.shouldLoadMore = true;
    }

    componentDidMount() {
        this.loadAPIData(this.nextPage);
    }

    loadAPIData = (page) => {

        console.log(`URL is  ${BASE_URL}/graphql`);
        console.log(`Next page is ${page}`);

        fetch(`http://www.sampleurl.com/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                query: `query {
                    users (limit:10,offset:${page}){
                      id,
                      name,
                    }
                  }`,
            }),
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.data.users)
                let listData = this.state.usersData;
                let data = listData.concat(res.data.users);
                this.setState({
                    usersData: data
                })
            }).catch(error => {
                console.log(error);
            });
    }

    renderData = ({ item, index }) => {
        console.log('Render method executed');
        return (
            <View style={{ width: '100%', height: 50 }}>
                <Text>{item.name}</Text>
            </View>
        )
    }

    renderFooter = () => {
        //it will show indicator at the bottom of the list when data is loading otherwise it returns null
        return (
            <ActivityIndicator
                style={{ color: '#000' }}
            />
        );
    }

    handleLoadMore = () => {
            this.shouldLoadMore = true;
            this.nextPage = this.nextPage + 1; // increase page by 1
            this.loadAPIData(this.nextPage); // method for API call 
    }
    render() {
        return (
            <SafeAreaView style={HStyles.container} >
                <FlatList
                    style={HStyles.list}
                    data={this.state.usersData}
                    renderItem={this.renderData}

                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={this.renderFooter}
                    onEndReachedThreshold={0.3}
                    onEndReached={this.handleLoadMore}
                    onMomentumScrollBegin = {()=> {this.shouldLoadMore = false}}
                />
            </SafeAreaView>
        )
    }
}


const HStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    list: {
        flex: 1,
        margin: 10,
        width: '100%',
    }
});

export default Home;