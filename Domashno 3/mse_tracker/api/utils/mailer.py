import time
import calendar


from Emailer import template_types
from Emailer.core import EmailSender
from datetime import date
from sqlite3 import connect

HOST_USER = "financetracker.mk@gmail.com"
HOST_PW = "qvvz fttq vnxr qbze"
sender = EmailSender(HOST_USER, HOST_PW)


def sendCode(email, code):
    print("infunc")

    sender.send(
        receiver=email,
        subject="OTVC from FinanceTracker",
        template="Here's your verification code: " + str(code),
        template_type=template_types.TEMPLATE_TYPE_TEXT
    )

def bulkSend():
    conn = connect("instance/ubase.db")
    curs = conn.cursor()

    curs.execute("SELECT * from user WHERE auth = '1'")
    res = curs.fetchall()
    print(res)
    todaysdate = str(date.today())

    connection2 = connect("datacollection/newslist.db")
    curs2 = connection2.cursor()

    current_gmt = time.gmtime()
    minusdate = calendar.timegm(current_gmt)
    minusdate -= 2 * 86400

    conn.close()

    messres = curs2.execute("SELECT * FROM newstable WHERE time >= '" + str(minusdate) + "' AND link LIKE '%coindesk%'")

    mess = list(messres)

    html_email_link = "eMailTemplate.html"

    for l in res:
        mail = l[3]
        context = {
            "name": l[1],
            "surname": l[2],
            "title":  mess[0][1],
            "link":  mess[0][2],
            "image":  mess[0][4],

            "title2": mess[1][1],
            "link2": mess[1][2],
            "image2": mess[1][4],

            "title3": mess[2][1],
            "link3": mess[2][2],
            "image3": mess[2][4],

            "title4": mess[3][1],
            "link4": mess[3][2],
            "image4": mess[3][4],

            "title5": mess[4][1],
            "link5": mess[4][2],
            "image5": mess[4][4]

        }
        sender.send(
            receiver=mail,
            subject="Newsletter for the day: " + todaysdate,
            template=html_email_link,
            context=context
        )