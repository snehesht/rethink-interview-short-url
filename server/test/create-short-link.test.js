require('dotenv').config() 
const { nanoid } = require('nanoid');
const { db } = require('../src/models');
const { createShortUrl } = require('../src/api/links')

describe("Create ShortLink", () => {
  beforeAll(async () => {
    await db.sync();
  })

  afterAll(async() => {
    await db.drop();
  })

  test('Create Link', async () => {
    const { linkInstance, retryCount } = await createShortUrl(nanoid());
    expect(typeof(linkInstance)).toEqual('object');
    expect(linkInstance).toHaveProperty('id');
    expect(linkInstance).toHaveProperty('link');
    expect(linkInstance).toHaveProperty('meta');
    expect(retryCount).toBeGreaterThanOrEqual(0);
  })
})