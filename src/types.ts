import type {
  CacheType,
  ChatInputCommandInteraction,
  Client,
  SharedSlashCommand,
} from 'discord.js';

export interface Command {
  data: SharedSlashCommand;
  excute: (
    interaction: ChatInputCommandInteraction<CacheType>,
    client: Client,
  ) => Promise<void>;
}
