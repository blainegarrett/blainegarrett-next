// Parser Tests
import parser from './parser';

describe('Parser', () => {
  let vid1Code = '[youtube:https://www.youtube.com/watch?v=s86-Z-CbaHA]';
  let vid2Code = '[youtube:https://www.youtube.com/watch?v=Uj3_KqkI9Zo]';
  let vid1HTML =
    '<div class="videoWrapper"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/s86-Z-CbaHA" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>';
  let vid2HTML =
    '<div class="videoWrapper"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/Uj3_KqkI9Zo" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>';

  let pre1Code = '<pre>let i = {};</pre>';
  let pre1HTML = '<pre class="language-javascript">let i = {};</pre>';

  test('not error on empty string', () => {
    expect(parser('')).toBe('');
  });

  test('replace single youtube video', () => {
    expect(parser(`<p>Watch this${vid1Code}<br /></p>`)).toBe(`<p>Watch this${vid1HTML}<br /></p>`);
  });
  test('replace when full string', () => {
    expect(parser(`${vid1Code}`)).toBe(`${vid1HTML}`);
  });
  test('replace when with newlines', () => {
    expect(parser(`\n${vid1Code}\n`)).toBe(`\n${vid1HTML}\n`);
  });

  test('replace multiple youtube videos', () => {
    expect(parser(`${vid1Code} ${vid2Code}`)).toBe(`${vid1HTML} ${vid2HTML}`);
  });

  test('replace code and youtube', () => {
    expect(parser(`${pre1Code} ${vid2Code}`)).toBe(`${pre1HTML} ${vid2HTML}`);
  });
});
