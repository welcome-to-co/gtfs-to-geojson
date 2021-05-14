#!/usr/bin/env node

import yargs from 'yargs';
/* eslint-disable-next-line node/file-extension-in-import */
import { hideBin } from 'yargs/helpers';

import gtfsToGeoJSON from '../lib/gtfs-to-geojson.js';
import { getConfig } from '../lib/file-utils.js';
import { formatError } from '../lib/log-utils.js';

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 --config ./config.json')
  .help()
  .option('c', {
    alias: 'configPath',
    describe: 'Path to config file',
    default: './config.json',
    type: 'string'
  })
  .option('s', {
    alias: 'skipImport',
    describe: 'Don\'t import GTFS file.',
    type: 'boolean'
  })
  .default('skipImport', undefined);

const handleError = error => {
  const text = error || 'Unknown Error';
  process.stdout.write(`\n${formatError(text)}\n`);
  console.error(error);
  process.exit(1);
};

const setupImport = async () => {
  const config = await getConfig(argv);
  await gtfsToGeoJSON(config);
  process.exit();
};

setupImport()
  .catch(handleError);
