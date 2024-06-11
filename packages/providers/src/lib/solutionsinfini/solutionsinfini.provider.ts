import {
  ChannelTypeEnum,
  ISendMessageSuccessResponse,
  ISmsOptions,
  ISmsProvider,
} from '@novu/stateless';
import axios from 'axios';

export class SolutionsinfiniSmsProvider implements ISmsProvider {
  id = 'solutionsinfini';
  channelType = ChannelTypeEnum.SMS as ChannelTypeEnum.SMS;
  public readonly DEFAULT_BASE_URL =
    'https://alerts.solutionsinfini.com/api/v4/';

  constructor(
    private config: {
      apiKey: string;
      channelId: string;
    }
  ) {}

  async sendMessage(
    options: ISmsOptions
  ): Promise<ISendMessageSuccessResponse> {
    const payload = {
      message: {
        text: options.content,
        type: 'text',
      },
    };

    const response = await axios.get(
      `${this.DEFAULT_BASE_URL}?api_key=${this.config.apiKey}&method=sms&message=${options.content}
      &sender=${this.config.channelId}&to=${options.to}`
    );

    return {
      id: response.data.id,
      date: new Date().toISOString(),
    };
  }
}
