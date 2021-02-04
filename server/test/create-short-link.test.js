require('dotenv').config() 
const { nanoid } = require('nanoid');
// const autocannon = require('autocannon')
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

  // test('AutoCannon', async () => {
  //   const result = await autocannon({
  //     url: 'http://localhost:8000/api/v1/link',
  //     connections: 10,
  //     pipelining: 8, 
  //     duration: 10,
  //     method: 'POST',
  //     body: JSON.stringify({ link: 'https://www.google.com'})
  //   })
  //   console.log(result)
  // })
})