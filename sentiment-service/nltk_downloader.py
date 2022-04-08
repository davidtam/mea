import nltk

nltk.download(
    [
        "names",
        "stopwords",
        "state_union",
        "twitter_samples",
        "movie_reviews",
        "averaged_perceptron_tagger",
        "vader_lexicon",
        "punkt",
    ],
    download_dir="/app/nltk/",
)
