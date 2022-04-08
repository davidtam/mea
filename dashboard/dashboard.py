import time

import streamlit as st
import pymongo
from pyecharts import options as opts
from pyecharts.charts import Pie
from streamlit_echarts import st_pyecharts

from streamlit_autorefresh import st_autorefresh


# Initialize connection.
# Uses st.experimental_singleton to only run once.
@st.experimental_singleton
def init_connection():

    client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")
    db = client.feedback
    feedbacks = db["feedbacks"]
    return feedbacks


feedbacks = init_connection()

st_autorefresh(interval=5000, key="fizzbuzzcounter")

# Pull data from the collection.
# Uses st.experimental_memo to only rerun when the query changes or after 10 min.
# @st.experimental_memo(ttl=5)
def get_data():
    items = feedbacks.find()
    items = list(items)  # make hashable for st.experimental_memo
    return items


# table = st.empty()
pie = st.empty()

# st.empty()

items = get_data()

total = len(items)

# table.dataframe([[item[col] for col in ['customerName','accountNumber','feedbackMessage']] for item in items])
# # Print results.
# st.write(f"We have {len(items)} feedbacks:")
# for item in items:
#     st.write(f"{item['customerName']} with account number {item['accountNumber']} said :{item['feedbackMessage']}")
data_pair = {"neutral": 0, "positive": 0, "negative": 0, "not_analysed": 0}
for item in items:
    if "sentimentScore" in item and "compound" in item["sentimentScore"]:

        if item["sentimentScore"]["compound"] < -0.3:
            data_pair["negative"] += 1
        elif item["sentimentScore"]["compound"] > 0.3:
            data_pair["positive"] += 1
        else:
            data_pair["neutral"] += 1
    else:
        data_pair["not_analysed"] += 1

pie_chart = (
    Pie()
    .add(
        series_name="Feedback messages sentimental breakdown",
        data_pair=list(data_pair.items()),
        radius=[40, 75],
        label_opts=opts.LabelOpts(
            vertical_align="bottom",
        ),
    )
    .set_global_opts(
        title_opts=opts.TitleOpts(title="Feedback by sentimental score", pos_top="5%"),
        legend_opts=opts.LegendOpts(pos_bottom="5%"),
        toolbox_opts=opts.ToolboxOpts(),
    )
)
st_pyecharts(pie_chart, theme="light")
