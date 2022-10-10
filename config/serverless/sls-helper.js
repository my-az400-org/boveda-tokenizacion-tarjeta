module.exports = {
  regionAbbrev(serverless) {
    const { options } = serverless;
    const { region } = options;
    let abbrev;
    switch (region) {
      case 'us-east-1':
        abbrev = 'UE2';
        break;
      case 'us-east-2':
        abbrev = 'UE1';
        break;
      default:
        throw new Error('REGION IS NOT VALID.');
    }
    return abbrev;
  },
  getCurrentStage(serverless) {
    const { options } = serverless;
    return options.stage;
  }
};
