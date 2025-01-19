import pandas as pd


def convert_date(date_str):
    return pd.to_datetime(date_str, format='%d.%m.%Y').timestamp()


def convert_number(number_str):
    if number_str == '':
        return None
    return float(number_str.replace('.', '').replace(',', '.'))