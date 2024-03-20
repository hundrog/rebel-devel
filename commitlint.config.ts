import type {UserConfig} from '@commitlint/types';
import {RuleConfigSeverity} from '@commitlint/types';

const Configuration: UserConfig = {

  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: {
    'body-case': [RuleConfigSeverity.Error, 'always', ['lower-case', 'snake-case']]
  },
};

export default Configuration;
