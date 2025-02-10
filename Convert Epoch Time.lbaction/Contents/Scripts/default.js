function run(argument) {
    if (!argument) {
        return [
            {
                title: `${Math.floor(Date.now()/1000)}`,
                badge: 'Current time in seconds',
                icon: 'clockTemplate',
            },
            {
                title: `${Date.now()}`,
                badge: 'Current time in milliseconds',
                icon: 'clockTemplate'
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
        badge: 'UTC',
        icon: 'clockTemplate',
    }
}

function localTime(title) {
    return {
        title,
        badge: 'Local',
        icon: 'clockTemplate',
    }
}
