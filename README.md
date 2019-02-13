# The NLU Bubble Application

Welcome to the Watson Natural Language Understanding (NLU) Hands-On THINK lab! This application demonstrates how to use NLU with the [`node.js` SDK](https://github.com/watson-developer-cloud/node-sdk) to extract interesting structured data from your documents!

## Helpful Links

* **NLU Demo**: https://ibm.biz/nlu_demo
* **NLU Documentation**: https://console.bluemix.net/apidocs/natural-language-understanding
* **NLU Hands-On Lab Document**: https://ibm.box.com/v/6588NLULab

## Getting Started

### Dev Environment

To get started with the app, you can use the Node Version Manager (`nvm`) to configure your `node.js` development environment.

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
nvm install
```

With this complete, you should have node `10.14.2` installed

```sh
node --version
v10.14.2
```

### Install Dependencies

To install all of the necessary dependencies, run the following:

```sh
npm install
```

### Start the App

To boot up the app on port `3000`, run the following:

```sh
npm start
```

## Use It

To use the running app, load [localhost:3000](http://localhost:3000) in your browser.

### Concepts Tab

On the `Concepts` tab, you can see the high-level concepts extracted from the document. Each bubble is weighted by how confidently NLU thinks the concept applies to the text.

### Keywords Tab

On the `Keywords` tab, you can see all of the important key phrases found in the document, weighted by how important the keyword is. Try clicking on a bubble to see the full text of the keyword.

### Entities Tab

The `Entities` tab shows all of the important `entities` extracted from the text. An `entity` is a key phrase that has been classified into one of a number of different types. For the full list of supported types, see the [NLU Documentation](https://console.bluemix.net/docs/services/natural-language-understanding/entity-types.html#entity-types-and-subtypes).

### Sentiment & Emotion Tab

The `Sentiment & Emotion` tab shows the range of emotions being expressed in the document as well as the top-level `positive`/`negative` sentiment.

### Syntax Tab

The `Syntax` tab shows a word-cloud of all the words in the document in their base (lemmatized) form. The bubbles are weighted by how many times the word appears in the document, and nouns and verbs are indicated by green and red respectively.

## Sample Inputs

Here are some sample text snippets and URLs that you can use to experiment with the features of NLU:

### Sentiment/Emotion

```
The traffic in Denver is truly awful at rush hour. I do love the food, though! It's also amzing to be that close to such great skiing in the mountains.
```

### Keywords

Flying Car Blog Post: https://medium.com/s/2069/flying-cars-are-closer-to-reality-than-you-think-a3ab21ff9373

### Entities

```
IBM and Red Hat, the world’s leading provider of open source cloud software, announced today that the companies have reached a definitive agreement under which IBM will acquire all of the issued and outstanding common shares of Red Hat for $190.00 per share in cash, representing a total enterprise value of approximately $34 billion.
```

```
I went to Paris with my best friends Paris and John.
```

### Categories

```
Golden State needs to trade Steph Curry and make Monta Ellis the point guard. Curry will bring back good value and Ellis needs the ball.
```

### Concepts

Stephen Hawkins Article: http://www.bbc.com/news/uk-43396008

### Semantic Roles

IBM + Red Hat Article: https://www.zdnet.com/article/why-ibm-bought-red-hat-its-all-open-source-cloud-all-the-time/

### Relations

```
Lindsey Vonn wins gold medal at world cup finals in Sweden
```

To try `relations`, you can send send a call directly from the `terminal` with the `curl` command. You'll need to fill in your own `apikey` with the one from your configured account.

```sh
curl -X POST -u "apikey:<YOUR API KEY>" \
  "$NLU_URL/v1/analyze?version=2019-02-11" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Lindsey Vonn wins gold medal at world cup finals in Sweden",
    "features": {
      "relations": {}
    }
  }'
```

## Extra Credit

Here are some ideas on how to make your `nlu_bubble` app even cooler. If you get any of them working, submit a PR! We'd love add your contributions to the tool.

### Add targeted-sentiment support for Entities and Keywords

The frontend work is all there, so all you have to do is modify the request body in [`router/index.js`](router/index.js).

### Call a custom model for Entities

Try adding `model: 'en-us-tir'` to [`router/index.js`](router/index.js). You can also try `en-news`. If you really want to get fancy, try adding a new input box to the UI that will set the custom model to use!

### Highlight Keywords in the displayed text

This one is completely not done yet, so requires the full-stack implementation. Here are some pointers to get you started:

1. Add `mentions: true` to the `entities` block of the NLU request in [`router/index.js`](router/index.js)
1. In [`public/js/viz.js`](public/js/viz.js), update the logic around populating `#analyzed_text` to add formatting based on the `mentions` returned.
1. For each `entity` returned in the NLU response, there is a `mentions` list containing objects with a `location` field. This `location` field gives offsets into the full `analyzed_text`, so you can use them to insert highlighting.

### Add Manual Targeted Sentiment

In addition to the output of `entities` and `keywords`, `targeted sentiment` can be applied to user-specified strings as well. Here's the high-level of how you could add it to the app:

1. Add a new form to the `input_forms` section of [`public/index.html`](public/index.html) to allow the user to input a target (maybe multiple targets?)
1. In [`public/js/viz.js`](public/js/viz.js), extract the `targets` data and send it with the `/fileUpload` or `analyzeURL` call sent to the backend
1. In [`router/index.js`](router/index.js), add the `targets` list to the `sentiment` block
1. Plumb the response back through and add a new tab!

This one is a big chunk of work, so good luck!
