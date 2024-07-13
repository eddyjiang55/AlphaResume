import json
from http import HTTPStatus
import dashscope
import time
import ast
import utlis as ut

def get_most_similar_position(apply_position, similarity_threshold):
    positions_list = ut.get_positions_list()

    prompt = (
        '你是一位专业的职业分析师，擅长分析不同职业之间的关联以及相似性。'
        '当前我有一个储存了50个岗位的岗位信息数据库，岗位信息包括岗位描述、岗位要求、岗位关键词、工作内容关键词。'
        '我希望你帮我完成一项近似检索的任务，具体的任务描述为我将提供给你用户的应聘岗位，你需要从数据库中50个岗位中选择与其最相似的一个岗位，并判断其相似性是否超过了一定的阈值(0到1中的一个数，越大表示相似性越高)。'
        '我将给你提供三个信息，分别是用户的应聘岗位，数据库中50个岗位的岗位名称list，以及相似性阈值。请你按照以下步骤输出结果 \n'
        '1.基于岗位描述、岗位要求、岗位关键词、工作内容关键词等角度，从50个岗位list中挑选出与用户应聘的岗位最相似的岗位。 \n'
        '2.给出最相似的岗位与用户应聘岗位之间的相似性分数(0到1之间的数，越大表示相似性越高)。 \n'
        '3.判断相似性分数是否超过了相似性阈值。 \n'
        "4.最后输出一个二元元组，(最相似岗位名称, 是否超过阈值)，例如用户应聘岗位为'软件开发工程师'，你的输出可能是('软件工程师', True)。 \n"
        '5.请直接输出这个二元元组，不需要在开头或者结尾添加任何总结性或解释性语言。 \n'
        '以下是我提供给你的信息: \n'
        f'用户应聘岗位：{apply_position}。 \n'
        f'数据库50个岗位名称list：{positions_list}。 \n'
        f'相似性阈值：{similarity_threshold}。'
    )

    response = dashscope.Generation.call(
        model='qwen-max-longcontext',
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
        return ast.literal_eval(response.output['text'])
    else:
        print(response.code)  
        print(response.message)


def generate_job_information(position, reference_information):
    prompt = (
        '你是一位杰出的职业分析师与简历写作专家，我想要你帮我生成一些应聘岗位的岗位信息，以便我更好地完成我的简历。'
        '我会提供给你两个信息，一个是所应聘的岗位，另一个是生成的岗位信息的参考样例json。请你根据这些信息，按照以下步骤进行信息生成：\n'
        '1.首先查看岗位信息的参考样例，明确你将要生成的岗位信息所包含的内容与基本格式。 \n'
        '2.查看所应聘的岗位，按照参考样例里所包含的内容收集关于应聘岗位的信息。 \n'
        '3.根据参考样例的格式，生成所应聘岗位的岗位信息json。 \n'
        '4.直接输出所生成的json，不需要在开头或者结尾添加任何总结性或者解释性语言。 \n'
        '以下是我提供给你的信息： \n'
        f'所应聘的岗位：{position}。 \n'
        f'参考样例json：\n {reference_information} \n'
    )

    response = dashscope.Generation.call(
        model='qwen-max-longcontext',
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


def generate_resume_guidence(position, keywords, reference_information):
    prompt = (
        '你是一位杰出的职业分析师与简历写作专家，我想要你帮我生成一份json格式的简历指导，以便我更好地完成我的简历。'
        '我会提供给你三个信息，分别是所应聘的岗位，应聘岗位关键词，以及生成的简历指导的参考样例json，包含样例岗位的关键词以及该关键词在简历中应该重点阐述哪些内容。'
        '请你根据这些信息，按照以下步骤进行信息生成： \n'
        '1.首先查看简历指导的参考样例，明确你将要生成的简历指导的基本格式。 \n'
        '2.查看所应聘的岗位及应聘岗位关键词，根据关键词收集该岗位的信息。 \n'
        '3.根据应聘岗位的关键词，生成在制作简历时该关键词应该重点阐述的内容。注意重点阐述内容应该多包含一些客观内容，包括技术工具、技术框架、量化指标、项目成果、业绩数据等。 \n'
        '4.根据参考样例的格式，生成所应聘岗位的简历指导json。 \n'
        '5.直接输出所生成的json，不需要在开头或者结尾添加任何总结性或者解释性语言。 \n'
        '以下是我提供给你的信息： \n'
        f'所应聘的岗位：{position}。 \n'
        f'应聘岗位关键词：{keywords} \n'
        f'简历指导json：\n {reference_information}'
    )

    response = dashscope.Generation.call(
        model='qwen-max-longcontext',
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


def QA(target, personal_cv, job_information):
    prompt = (
        f'你是一位的简历写作专家，我现在想让你帮助我生成一些简历文本用于制作我的个人简历，我将给你提供两份文档帮助你生成简历，一份是我的个人简历1，另外一份是我所应聘岗位的岗位信息2。 \n 个人简历1:  \n {personal_cv} \n 岗位信息2: \n {job_information}'
        f'请你首先从我提供的岗位信息2中了解该岗位所需要的能力，结合你自身对于该岗位的理解，对我的个人简历1中的{target}部分中的主观描述性语言进行详细的扩写，使我的经历介绍更加符合岗位所需，提升岗位匹配度。'
        f'记住你只需要生成我指定的部分，不需要生成其它部分。输出文本的格式与个人简历1中{target}部分格式一致。'
        f'请直接输出结果，不需要在开头或者结尾生成任何解释性语句与总结性语言。'
    )

    response = dashscope.Generation.call(
        model='qwen-max-longcontext',
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

def QAKeywords(target, personal_cv, job_information, guidence):
    prompt = (
        f'你是一位简历写作专家，我现在想让你帮我创作一些简历文本。我会向你提供三分文件，分别为我的个人简历1，应聘岗位的岗位信息2，以及简历指导3。 \n 个人简历1：\n {personal_cv} \n 岗位信息2：\n {job_information} \n 简历指导3： \n {guidence} \n'
        f"我希望你根据我提供的信息，对我的个人简历1中的以下文本进行优化扩写: \n { personal_cv[target] } \n 请依照以下思路进行优化扩写。"
        f"1. 岗位信息1中提供了我所应聘的岗位的工作内容关键词: {job_information['工作内容关键词']}，我希望你依据这些关键词进行扩写，简历指导3 告诉了你每个关键词应该如何进行扩写。"
        f"2. 由于我不希望每段职业经历都使用相同的关键词来进行扩写，故我希望你先根据需优化扩写的文本中的每段职业经历的'职责/业绩描述'部分，从工作内容关键词中挑选出3个与每段职业经历相符合的若干关键词来进行扩写。不同的职业经历可以挑选不同的关键词。"
        f"3. 根据你针对每段职业经历的 '职责/业绩描述' 所挑选的关键词，结合岗位信息2中的的岗位关键词，对需要优化的文本中的每段职业经历的 '职责/业绩描述' 文本按照挑选的关键词分为多段进行扩写，每段一个关键词，关键词放在扩写的每个小段的句首加粗表示。"
        f'4. 你的扩写应使我的经历更能胜任该岗位的工作。输出文本的格式与个人简历1中的{target}部分格式一致，依然为多段职业经历。'
        f'5. 请直接输出结果，不需要在开头或结尾生成任何解释性语言与总结性语言。'
    )

    response = dashscope.Generation.call(
        model='qwen-max-longcontext',
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


def writeCV_first(first_cv_json):
    prompt = (
        '你是一位精通Markdown简历写作的专家，我希望你能帮我生成一些简历文本。'
        '我将提供一份JSON格式的简历信息，我希望能够生成一份Markdown格式的简历文本。'
        'JSON中值为None表示用户没有填写这部分信息，生成简历时可以忽略掉这部分内容。'
        '请直接输出Markdown格式的简历，不需要在开头或者结尾添加任何总结性或者解释性语言。'
        '请严格按照JSON中的文本来生成，不需要增加或删减任何文字。 \n'
        f'我的简历信息: \n {first_cv_json}'
    )

    response = dashscope.Generation.call(
        model='qwen-max-longcontext',
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

def wirteCV_second(improved_cv_first_md, second_cv_json):
    prompt = (
        '你是一位专业的Markdown简历写作专家，我想要你帮我完成一份Markdown格式的简历。'
        f'我已经完成了一部分Markdown格式简历的撰写，如下： \n{improved_cv_first_md}。 \n'
        '请根据我提供的JSON简历中的信息，完成剩余部分的Markdown简历的撰写。'
        'JSON中值为None表示用户没有填写这部分信息，生成简历时可以忽略掉这部分内容。'
        '请严格按照JSON中的文本来生成，不需要增加或删减任何文字。'
        '请注意格式及标题的统一，以便于我在之后将两部分Markdown简历拼接起来得到完整的简历。记住你只需要生成我提供的JSON格式的简历文本部分，不需要生成整个简历。 \n'
        f'以下是我提供的JSON格式的简历信息：\n {second_cv_json}'

    )

    response = dashscope.Generation.call(
        model='qwen-max-longcontext',
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


def wirteCV(template_null, template, cv_md):

    prompt = (
        '你是一位简历写作专家，我希望你帮我完成一份1800tokens左右的中文简历。'
        '我会提供给你三份Markdown格式的简历文件，分别为需要完善的Markdown简历模板1，已经完善的Markdown简历模板2，以及Markdown格式的我的个人简历3。'
        '待完善的简历模板1中需要填写的内容我已经为你进行了标识，我希望你将我的个人简历3中的文本填入到简历1的对应位置。'
        '请你按照以下的步骤进行生成： \n'
        '1.查看简历模板1与简历模板2，简历模板1告诉了你生成简历的格式，简历模板2向你展示了我所希望你生成的效果。'
        '2.查看个人简历3，将个人简历3中的文本填入到简历模板1中对应的位置。记住要严格按照简历1的格式，不要做任何改动。'
        "3.突出保留简历3中与职业相关的重点内容，包括职业经历中的'职业/业绩描述'；项目经历中的'项目描述'、'项目成就、'项目职责'；科研论文和知识产权中的'研究描述'。以上内容需要写得更丰富，尽量保留我所给的简历3中的信息。这些信息是简历中的关键信息，应该写得更丰富，字数更多。"
        '4.请直接输出结果，不需要在开头或结尾生成任何解释性语言与总结性语言，且需要严格遵守简历总tokens数量要求，输出的tokens数量应该为1800tokens左右。 \n'
        f"需要完善的简历1:  \n {template_null} \n"
        f"已经完善的简历2: \n {template} \n"
        f"个人简历3: \n {cv_md} \n"
    )

    response = dashscope.Generation.call(
        model='qwen-max-longcontext',
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
