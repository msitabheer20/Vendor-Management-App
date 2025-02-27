import { Box, Icon, InlineGrid, Text } from '@shopify/polaris';
import { AlertCircleIcon } from '@shopify/polaris-icons';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextEditor.css'
import PropTypes from 'prop-types'

const defaultModuleOptions = {
    toolbar: [
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link'],
        ['clean']
    ],
    clipboard: {
        matchVisual: false
    }
};

export function RichTextEditor({
    bounds = '.quill',
    defaultValue,
    formats,
    id,
    modules,
    onBlur,
    onChange,
    onChangeSelection,
    onFocus,
    onKeyDown,
    onKeyPress,
    onKeyUp,
    placeholder,
    preserveWhitespace,
    value,
    label,
    labelHidden = false,
    disabled,
    error
}) {
    const mergedModuleOptions = {
        ...defaultModuleOptions,
        ...modules,
        toolbar: modules?.toolbar || defaultModuleOptions.toolbar,
        clipboard: {
            ...defaultModuleOptions.clipboard,
            ...(modules?.clipboard || {})
        }
    };

    let className = disabled ? 'quill--disabled ' : '';
    if (error) className += 'quill--error';

    return (
        <Box>
            {!labelHidden && (
                <Box paddingBlockEnd='100'>
                    <Text as='p' tone={disabled ? 'disabled' : 'base'}>
                        {label}
                    </Text>
                </Box>
            )}
            <Quill
                bounds={bounds}
                className={className}
                defaultValue={defaultValue}
                formats={formats}
                id={id}
                modules={mergedModuleOptions}
                onBlur={onBlur}
                onChange={onChange}
                onChangeSelection={onChangeSelection}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                onKeyPress={onKeyPress}
                onKeyUp={onKeyUp}
                placeholder={placeholder}
                preserveWhitespace={preserveWhitespace}
                readOnly={disabled}
                theme="snow"
                value={value}
            />
            {error && (
                <InlineGrid alignItems='start' gap='150' columns='20px auto'>
                    <Icon source={AlertCircleIcon} tone='textCritical' />
                    <Text as='p' tone='critical'>
                        {error}
                    </Text>
                </InlineGrid>
            )}
        </Box>
    );
}

RichTextEditor.propTypes = {

    bounds: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    defaultValue: PropTypes.string,
    formats: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
    modules: PropTypes.object,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onChangeSelection: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyPress: PropTypes.func,
    onKeyUp: PropTypes.func,
    placeholder: PropTypes.string,
    preserveWhitespace: PropTypes.bool,
    value: PropTypes.string,
    label: PropTypes.string,
    labelHidden: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

};