// Library
import React from 'react';
import { Avatar, Button as RNPButton, Card as RNPCard, Title, TextInput as RNPTextInput } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Card: any = RNPCard;
const Button: any = RNPButton;
const TextInput: any = RNPTextInput;

const MyComponent = () => { 
    const [text, setText] = React.useState('');
    return (
        <Card>
            <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
            <Card.Content>
                <Title>Card Title</Title>
                <TextInput
                    label="Email"
                    value={text}
                    onChangeText={text => setText(text)}
                />
            </Card.Content>
            <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
            </Card.Actions>
        </Card>
    );
}

export default MyComponent;
