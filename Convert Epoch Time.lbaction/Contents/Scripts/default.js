function run(argument) {
    if (!argument) {
        return [
            {
                title: `${Math.floor(Date.now()/1000)}`,
                subtitle: 'Current time in seconds',
            },
            {
                title: `${Date.now()}`,
                subtitle: 'Current time in milliseconds',
            },
        ]
    }

    const argumentAsInteger = parseInt(argument)

    let dateObject

    if (argument.match(/^\d{1,10}$/)) {
        dateObject = new Date(argumentAsInteger * 1000)
    } else if (argument.match(/^\d{12,}$/)) {
        dateObject = new Date(argumentAsInteger)
    } else {
        return LaunchBar.alert('Input value was not 1-10 digits (epoch in seconds) or 12+ digits (epoch in milliseconds).')
    }

    return [
        utcTime(formatDatetime({dateObject, isUtc: true})),
        localTime(formatDatetime({dateObject, isUtc: false}))
    ]
}

function formatDatetime({dateObject, isUtc}) {
    const options = {
        timeStyle: 'medium',
        dateStyle: 'full',
    }

    if (isUtc) {
        return LaunchBar.formatDate(dateObject, {
            ...options,
            relativeDateFormatting: false,
            timeZone: 'Etc/UTC'
        });
    } else {
        return LaunchBar.formatDate(dateObject, {
            ...options,
            relativeDateFormatting: true,
        });
    }
}

function utcTime(title) {
    return {
        title,
        subtitle: 'Time in UTC',
        alwaysShowsSubtitle: true,
    }
}

function localTime(title) {
    return {
        title,
        subtitle: 'Local time',
        alwaysShowsSubtitle: true,
    }
}
