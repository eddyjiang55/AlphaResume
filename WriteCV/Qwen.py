import json
from http import HTTPStatus
import dashscope
import time

# generate text
def QA(target,info_dict):
    requirements = f"根据我的信息库中所写的应聘岗位, 请先从我提供的信息库中的岗位信息中的招聘信息及岗位关键词了解该岗位所需的能力，然后按照你所了解到的岗位所需能力，对信息库中的{target}部分进行详细地扩充，使我的经历更加符合岗位所需，提升岗位匹配度。记住你所生成的文本要符合招聘要求，并能够体现岗位关键词。输出文本的格式与信息库中{target}格式一致。"
    prompt = f"我想要应聘工作，需要你帮我生成一些文本用于制作简历，我将提供一个信息库,其中包含用户信息，应聘岗位及岗位信息。请你根据我提供的信息库，按照我提出的要求，生成相应的文本。请直接输出结果，不需要任何前缀或用于解释的语句，。我的要求:{requirements},信息库:{info_dict}."

    response = dashscope.Generation.call(
        model=dashscope.Generation.Models.qwen_plus,
        prompt=prompt,
        seed=1234,
        top_p=0.2,
        result_format='text',
        enable_search=False,
        max_tokens=2000,
        temperature=0.1,
        repetition_penalty=1.0

    )

    if response.status_code == HTTPStatus.OK:
        print(response.usage)  
        return response.output['text']  
    else:
        print(response.code) 
        print(response.message)  


# generate text with keywords
def QAKeywords(target,keywords,info_dict):
    requirements = f"我提供的关键词是我所要应聘岗位的完整工作流程，请根据我所提供的工作流程，对我提供的信息库中的用户信息中的{target}文本中的每段工作经历按照工作流程分为多段进行扩写，关键词放在扩写的每个小段的句首加粗表示。你的扩写应使我的经历更能胜任该岗位的工作"
    prompt = f"我想要应聘工作，需要你帮我生成一些文本用于制作简历，我将提供一个信息库,其中包含用户信息，应聘岗位及岗位信息，以及一些关键词。请你根据我提供的信息库和关键词，按照我提出的要求，生成相应的文本。请直接输出结果，不需要任何前缀或用于解释的语句，。我的要求:{requirements},信息库:{info_dict},关键词:{keywords}."
    response = dashscope.Generation.call(
        model=dashscope.Generation.Models.qwen_plus,
        prompt=prompt,
        seed=1234,
        top_p=0.2,
        result_format='text',
        enable_search=False,
        max_tokens=2000,
        temperature=0.1,
        repetition_penalty=1.0

    )

    if response.status_code == HTTPStatus.OK:
        print(response.usage)  
        return response.output['text']  
    else:
        print(response.code)  
        print(response.message)  


# convert json information to Markdown CV using Qwen
def writeCV(information):
    prompt = f"我将提供我的信息，请根据我提供的信息，按照适当的顺序帮我生成一份Markdown格式的简历模板。我的信息:{information}"

    response = dashscope.Generation.call(
        model=dashscope.Generation.Models.qwen_plus,
        prompt= prompt,
        seed = 1234,
        top_p = 0.2,
        result_format = 'text',
        enable_search = False,
        max_tokens = 2000,
        temperature = 0.1,
        repetition_penalty = 1.0
    )

    if response.status_code == HTTPStatus.OK:
        print(response.usage)  # The usage information
        return response.output['text']  # The output text
    else:
        print(response.code)  # The error code.
        print(response.message)  # The error message.