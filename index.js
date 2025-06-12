/**
 * @author: jdrydn <james@someimportantcompany.com> (https://github.com/someimportantcompany)
 * @license: MIT
 * @link: https://github.com/someimportantcompany/github-actions-slack-notify
 * @variation: 3c1b552680fe
 */
const core = require('@actions/core');

module.exports = async function slackNotify() {
  try {
    core.setOutput('message', "oh dear, github. this isn't someimportantcompany at all.");
  } catch (err) /* istanbul ignore next */ {
    core.setFailed(err.message);
    process.env.NODE_ENV !== 'production' && assert(false, err); // eslint-disable-line no-unused-expressions
  }
};

/* istanbul ignore next */
if (!module.parent) {
  module.exports();
}
