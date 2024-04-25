import {
    CommandInteraction,
    Client,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    GuildScheduledEventCreateOptions,
    GuildScheduledEventEntityType,
    GuildScheduledEventPrivacyLevel,
    ChannelType,
    VoiceChannel,
    // Snowflake,
} from 'discord.js'
import { Command } from '../../Command'
import { stringToTime } from '../utils/stringToTime'
import dayjs from 'dayjs'
import { fetchOpenAIChatCompletion } from '../../openai'

const partySystemPrompt =
    'You are specialised in generating fun party ideas and games that are doable over voice chats like discord. When prompted by a user you will respond with a JSON object containing a name and description of the party.'

export const Partify: Command = {
    name: 'partify',
    description: 'start a party!',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'theme',
            description:
                'what kind of party? e.g. "halloween skeletons party games"',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'when',
            description:
                "a time like 'tomorrow at 4pm' or 'next week sunday at 12'",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (_: Client, interaction: CommandInteraction) => {
        const timeInput = interaction.options.get('when')?.value as string
        const targetTime = stringToTime(timeInput, interaction.createdAt)
        const guildChanManager = interaction.guild?.channels
        if (guildChanManager === undefined) {
          throw new Error("can't get guildchannelmanager")
        }
        // console.log("count",guildChanManager.channelCountWithoutThreads)
        const channels = await guildChanManager.fetch()
        let voiceChan = channels.find(chan => chan?.type == ChannelType.GuildVoice) as VoiceChannel
        if (voiceChan === undefined || voiceChan === null) {
          voiceChan = await guildChanManager.create({
            name: "party",
            type: ChannelType.GuildVoice,
          })
        }



        const generatedPartyIdea = await fetchOpenAIChatCompletion(
            interaction.options.get('theme')?.value as string,
            partySystemPrompt
        )
        const partyJson: {name: string; description: string;} = JSON.parse(generatedPartyIdea)
        console.log(partyJson)
        // this gives us an object to use in creating the event
        // { name: string, description: string }


        const newEvent: GuildScheduledEventCreateOptions = {
          ...partyJson,
          scheduledStartTime: targetTime,
          // scheduledEndTime: dayjs(targetTime).add(1,"hour").toDate(),
          entityType: GuildScheduledEventEntityType.Voice,
          privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
          channel: voiceChan
          // entityMetadata: {location: "voice channel"}
        }

        // code to generate event goes here
        interaction.guild?.scheduledEvents.create(newEvent)

        await interaction.followUp({
            content: `OK! You've got a party coming up at <t:${dayjs(targetTime).unix()}>`,
        })
    },
}
