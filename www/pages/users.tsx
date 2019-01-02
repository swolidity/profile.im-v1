import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ErrorMessage from "../components/ErrorMessage";
import { Flex, Box, Heading, Card, Image, Text } from "rebass";

interface Props {
  username: string;
}

const GET_USER = gql`
  query user($username: String!) {
    user(where: { username: $username }) {
      name
      username
      photo
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
            <Flex justifyContent="center">
              <Box my={5} css={{ textAlign: "center" }}>
                <Image
                  src={user.photo}
                  alt={user.name}
                  width={100}
                  borderRadius={50}
                  mb={3}
                />
                <Heading>{user.username}</Heading>

                <Card
                  my={2}
                  p={2}
                  borderRadius={8}
                  boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
                >
                  <Text>Bio</Text>
                  <p>Dad. Deadlifter. Lover of life.</p>
                </Card>

                <Box my={2}>
                  <ul>
                    <li>
                      <a href="#">Maker</a>
                    </li>
                    <li>
                      <a href="#">Lifter</a>
                    </li>
                  </ul>
                </Box>

                <Box my={2}>
                  <iframe
                    src="https://open.spotify.com/embed/track/1FRFgyPNuqfXIRYlCJ1kwR"
                    width="300"
                    height="80"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                  />
                </Box>
              </Box>
            </Flex>
          );
        }}
      </Query>
    );
  }
}
