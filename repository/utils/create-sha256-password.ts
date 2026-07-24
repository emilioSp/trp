#!/usr/bin/env node

import { createHash } from 'node:crypto';

const password = process.env.PASSWORD;
const username = process.env.USER_NAME;

console.log(
  createHash('sha256').update(`${password}${username}`).digest('base64'),
);
