
import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from 'react-apollo';
import ErrorMessage from '../components/ErrorMessage';

interface Props {
    username: string;
}

const GET_USER = gql`
    query user($username: String!) {
        user(where: {username: $username} ) {
            name
            username
        }
    }
`;

export default class Users extends Component<Props> {
    static async getInitialProps({ query }) {
        return query;
    }

    render() {
        return (
            <Query query={GET_USER} variables={{ username: this.props.username }}>
                {({ loading, error, data: { user } }) => {
                    if (loading) return <div>Loading...</div>;
                    if (error) return <ErrorMessage message={error.message} />;

                    return (
                        <div>
                            <h1>{user.name}</h1>
                            <h3>{user.username}</h3>
                        </div>
                    );
                }}
            </Query>
        )
    }
}