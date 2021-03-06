import React from 'react';
import noop from 'lodash/noop';
import { shallow } from 'enzyme';
import OpenWithButton, { getTooltip } from '../OpenWithButton';
import messages from '../../messages';

describe('components/ContentOpenWith/OpenWithButton', () => {
    const getWrapper = props => shallow(<OpenWithButton {...props} />);

    describe('getTooltip()', () => {
        test('should return nothing if the button is loading', () => {
            const result = getTooltip(null, null, true);
            expect(result).toBe(null);
        });

        test('should use a message if there is an error', () => {
            const result = getTooltip(null, 'error', false);
            expect(result.props.defaultMessage).toEqual(messages.errorOpenWithDescription.defaultMessage);
        });

        test('should return the display description if provided', () => {
            const description = 'tooltip description';
            const result = getTooltip(description, null, false);
            expect(result).toBe(description);
        });

        test('should use a message if there is nothing else to display', () => {
            const result = getTooltip(null, null, false);
            expect(result.props.defaultMessage).toEqual(messages.emptyOpenWithDescription.defaultMessage);
        });
    });

    test('should render as disabled if the integration is disabled', () => {
        const wrapper = getWrapper({
            displayIntegration: { isDisabled: true, displayName: 'Adobe Sign' },
            onClick: noop,
        });
        expect(wrapper).toMatchSnapshot();
    });

    test('should render as disabled if there is no display integration', () => {
        const wrapper = getWrapper({
            displayIntegration: { isDisabled: false, displayName: null },
            onClick: noop,
        });

        expect(wrapper).toMatchSnapshot();
    });

    test('should render with the correct icon', () => {
        const wrapper = getWrapper({
            displayIntegration: {
                isDisabled: false,
                displayName: 'Google Docs',
            },
            onClick: noop,
        });

        expect(wrapper).toMatchSnapshot();
    });
});
