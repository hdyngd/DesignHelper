<template>
    <div>
        <beautiful-chat
                :participants="participants"
                :titleImageUrl="titleImageUrl"
                :onMessageWasSent="onMessageWasSent"
                :messageList="messageList"
                :newMessagesCount="newMessagesCount"
                :isOpen="isChatOpen"
                :close="closeChat"
                :icons="icons"
                :open="openChat"
                :showEmoji="true"
                :showFile="true"
                :showTypingIndicator="showTypingIndicator"
                :colors="colors"
                :alwaysScrollToBottom="alwaysScrollToBottom"
                :messageStyling="messageStyling"
                @onType="handleOnType"
                @edit="editMessage" />
    </div>
</template>

<script>
    import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
    import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
    import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
    import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'

    export default {
        name: 'app',
        props: {
            participants: Array,
            messageList: Array,
            addMessage: Function,
            storeMessage: Function,
        },
        data() {
            return {
                icons: {
                    open: {
                        img: OpenIcon,
                        name: 'default',
                    },
                    close: {
                        img: CloseIcon,
                        name: 'default',
                    },
                    file: {
                        img: FileIcon,
                        name: 'default',
                    },
                    closeSvg: {
                        img: CloseIconSvg,
                        name: 'default',
                    },
                },
                // :TODO
                titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
                // :TODO
                newMessagesCount: 0,
                isChatOpen: false, // to determine whether the chat window should be open or closed
                showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
                colors: {
                    header: {
                        bg: '#4e8cff',
                        text: '#ffffff'
                    },
                    launcher: {
                        bg: '#4e8cff'
                    },
                    messageList: {
                        bg: '#ffffff'
                    },
                    sentMessage: {
                        bg: '#4e8cff',
                        text: '#ffffff'
                    },
                    receivedMessage: {
                        bg: '#eaeaea',
                        text: '#222222'
                    },
                    userInput: {
                        bg: '#f4f7f9',
                        text: '#565867'
                    }
                }, // specifies the color scheme for the component
                alwaysScrollToBottom: true, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
                messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
            }
        },
        // TODO:
        mounted () {
            Echo.channel('chat.' + this.$route.params.id)
                .listen('MessageCreated', (e) => {
                    let content = {
                        type: e.message.type,
                        author: e.message.user_id
                    }

                    switch (e.message.type) {
                        case 'text':
                            content.data = {text: e.message.content}
                            break;
                        case 'emoji':
                            content.data = {emoji: e.message.content}
                            break;
                        case 'file':
                            return;
                        default:
                    }

                    this.addMessage(content);
                    // this.messageList = [...this.messageList, content]
                });
        },
        methods: {
            sendMessage(text) {
                if (text.length > 0) {
                    this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
                    this.onMessageWasSent({author: 'support', type: 'text', data: {text}})
                }
            },
            onMessageWasSent(message) {
                const params = this.prepareMessage(message)
                this.storeMessage(params)
                // called when the user sends a message
                this.addMessage(message);
            },
            openChat() {
                // called when the user clicks on the fab button to open the chat
                this.isChatOpen = true
                this.newMessagesCount = 0
            },
            closeChat() {
                // called when the user clicks on the botton to close the chat
                this.isChatOpen = false
            },
            handleScrollToTop() {
                // called when the user scrolls message list to top
                // leverage pagination for loading another page of messages
            },
            handleOnType() {
                console.log('Emit typing event')
            },
            editMessage(message) {
                const m = this.messageList.find(m => m.id === message.id);
                m.isEdited = true;
                m.data.text = message.data.text;
            },
            prepareMessage(message) {
                let params = {
                    proposition_id: this.$route.params.id,
                    type: message.type
                };

                switch (message.type) {
                    case 'text':
                        params.content = message.data.text
                        break;
                    case 'emoji':
                        params.content = message.data.emoji
                        break;
                    case 'file':
                        return;
                    default:
                }

                return params;
            }
        }
    }
</script>

<style>
    .sc-chat-window {
        z-index: 100;
    }
</style>