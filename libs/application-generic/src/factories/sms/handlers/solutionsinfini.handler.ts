import { ChannelTypeEnum, ICredentials } from '@novu/shared';
import { SolutionsinfiniSmsProvider } from '@novu/providers';
import { BaseSmsHandler } from './base.handler';

export class SolutionsInfiniHandler extends BaseSmsHandler {
  constructor() {
    super('solutionsinfini', ChannelTypeEnum.SMS);
  }

  buildProvider(credentials: ICredentials) {
    const config = {
      apiKey: credentials.apiKey,
      channelId: credentials.channelId,
    };
    this.provider = new SolutionsinfiniSmsProvider(config);
  }
}
