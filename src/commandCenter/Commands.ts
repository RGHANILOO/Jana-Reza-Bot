import { Command } from '../Command'
import { Howdy } from './commands/Howdy'
import { Assistant } from './commands/Assistant'
import { Time } from './commands/Time'

export const Commands: Command[] = [Howdy, Time, Assistant];
