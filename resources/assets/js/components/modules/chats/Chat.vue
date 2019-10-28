<template>
    <div>
        <beautiful-chat
                :participants="participants"
                :titleImageUrl="titleImageUrl"
                :onMessageWasSent="onMessageWasSent"
                :messageList="messageList"
                :newMessagesCount="newMessagesCount"
                :isOpen="isChatOpenState"
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
            proposition: Object,
            addMessage: Function,
            storeMessage: Function,
            isChatOpenState: Boolean,
            chatToggle: Function,
            propositionId: Number,

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
                titleImageUrl: this.menuImage(),
                newMessagesCount: 0,
                isChatOpen: this.isChatOpenState, // to determine whether the chat window should be open or closed
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
                messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
            }
        },
        mounted () {
            Echo.channel('chat.' + this.propositionId)
                .listen('MessageCreated', (e) => {
                    this.newMessagesCount++
                    const content = this.conversionData(e.message, false)
                    this.addMessage(content);
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
                    .then((res) => {
                       const data = this.conversionData(res, true)
                       this.addMessage(data);
                    });
            },
            openChat() {
                // called when the user clicks on the fab button to open the chat
                // this.isChatOpen = true
                this.chatToggle(true);
                this.newMessagesCount = 0
            },
            closeChat() {
                // called when the user clicks on the botton to close the chat
                // this.isChatOpen = false
                this.chatToggle(false);
                this.newMessagesCount = 0
            },
            handleScrollToTop() {
                // called when the user scrolls message list to top
                // leverage pagination for loading another page of messages
            },
            handleOnType() {
                // const echo = this.echo
                // if($(".sc-user-input--text").text() !== ''){
                //     echo.whisper('editing', {});
                // } else {
                //     echo.whisper('edited', {});
                // }
                // this.showTypingIndicator = '...';
                // console.log('Emit typing event')
            },
            editMessage(message) {
                const m = this.messageList.find(m => m.id === message.id);
                m.isEdited = true;
                m.data.text = message.data.text;
            },
            prepareMessage(message) {
                let params = {
                    proposition_id: this.propositionId,
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
                        params = new FormData();
                        params.append('proposition_id', this.propositionId);
                        params.append('type', message.type);
                        params.append('content', message.data.file.name);
                        params.append('file', message.data.file);
                        break;
                    default:
                }

                return params;
            },
            menuImage() {
                return (this.proposition.menu.image) ? this.proposition.menu.image : 'https://design-helper.s3-ap-northeast-1.amazonaws.com/menu/picture_icon.png';
            },
            conversionData(data, isMe) {
                let content = {
                    type: data.type,
                    author: (isMe) ? 'me' : data.user_id
                }

                switch (data.type) {
                    case 'text':
                        content.data = {text: data.content}
                        break;
                    case 'emoji':
                        content.data = {emoji: data.content}
                        break;
                    case 'file':
                        content.data = {
                            file:  {
                                name: data.content,
                                url: data.url
                            }
                        }
                        break;
                    default:
                }

                return content;
            }
        }
    }
</script>

<style>
    .sc-chat-window {
        z-index: 100;
    }

    .sc-header--img {
        width: 80px;
        height: 80px;
    }
</style>